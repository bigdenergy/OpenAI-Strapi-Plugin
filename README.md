
# Strapi x OpenAI Plugin

An OpenAI plugin to generate your Strapi content.


## Documentation

#### 0. Install via NPM or Yarn.
```
npm i strapi-open-ai-plugin
```
```
yarn add strapi-open-ai-plugin
```


#### 1. Create a .env with your Open AI API Token. 
```
OPEN_AI_API_TOKEN=‘API_TOKEN‘
```

#### 2. Enable the OpenAI x Strapi plugin in /config/plugins.js. 
```
module.exports = ({ env }) => ({
  ...
  'open-ai': {
    enabled: true,
    config: {
      apiToken: process.env.OPEN_AI_API_TOKEN,
    },
    resolve: './node_modules/strapi-open-ai-plugin',
  },
});
```

## Authors

- [@ValentinHardy](https://www.github.com/viesurvous)


## Badges


[Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/40/).

