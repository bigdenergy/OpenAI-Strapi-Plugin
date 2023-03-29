import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import PluginIcon from './components/PluginIcon';

const name = pluginPkg.strapi.name;

export default { 
  register(app) {
    
    app.customFields.register({
      name: "text-ai",
      pluginId: "open-ai", 
      type: "string", 
      intlLabel: {
        id: "open-ai.text-ai.label",
        defaultMessage: "Text AI",
      },
      intlDescription: {
        id: "open-ai.text-ai.description",
        defaultMessage: "OpenAI integration for your Strapi content.",
      },
      isRequired: pluginPkg.strapi.required || false,
      icon: PluginIcon,
      components: {
        Input: async () => import(/* webpackChunkName: "input-component" */ "./components/Input"),
      },
      options:{
        advanced: [
          {
            sectionTitle: null,
            items: [
              {
                intlLabel: {
                  id: 'global.type',
                  defaultMessage: 'Type',
                },
                name: 'options.type',
                size: 12,
                type: 'radio-group',
                radios: [
                  {
                    title: {
                      id: 'form.attribute.text.option.short-text',
                      defaultMessage: 'Sort text',
                    },
                    description: {
                      id: 'form.attribute.text.option.short-text.description',
                      defaultMessage:
                        'Best for titles, names, links (URL). It also enables exact search on the field.',
                    },
                    value: 'string',
                  },
                  {
                    title: {
                      id: 'form.attribute.text.option.long-text',
                      defaultMessage: 'Long text',
                    },
                    description: {
                      id: 'form.attribute.text.option.long-text.description',
                      defaultMessage: 'Best for descriptions, biography. Exact search is disabled.',
                    },
                    value: 'text',
                  },
                ],
              },
              {
                intlLabel: {
                  id: 'global.required',
                  defaultMessage: 'Required field',
                },
                name: 'options.required',
                description: "You won't be able to create an entry if this field is empty",
                size: 12,
                type: 'checkbox',
                checkbox: [ 
                  {
                    title: {
                      id: 'form.attribute.text.checkbox',
                      defaultMessage: 'Required field',
                    },
                    description: {
                      id: 'form.attribute.text.checkbox.description',
                      defaultMessage:
                        "You won't be able to create an entry if this field is empty",
                    },
                    value: 'string',
                  }
                ],
              },
            ],
          },
        ],
      },
    });
  },

  

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};