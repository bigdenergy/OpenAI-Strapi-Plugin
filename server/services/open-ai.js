'use strict';

const axios = require('axios');

module.exports = ({ strapi }) => ({

  async generateText(prompt) {
    try {
      const response = await axios(
        {
          url: 'https://api.openai.com/v1/completions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${strapi.plugin('open-ai').config('apiToken')}`
          },
          data: JSON.stringify({
            'model': 'text-davinci-003',
            'prompt': `${prompt}`,
            'temperature': 0.4,
            'max_tokens': 2048,
            'top_p': 1,
            'n': 1,
            'frequency_penalty': 0,
            'presence_penalty': 0
          })
        })

      return response.data;
    }
    catch (err) {
      console.log(err.response)
    }

  }

});