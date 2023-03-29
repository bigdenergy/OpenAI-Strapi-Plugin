'use strict';

module.exports = ({ strapi }) => ({
  async generate(ctx) {
    ctx.body = await strapi
      .plugin('open-ai')
      .service('openAi')
      .generateText(ctx.request.body.prompt);
  },
});