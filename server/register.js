'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'text-ai',
    plugin: 'open-ai',
    type: 'text',
  });
};
