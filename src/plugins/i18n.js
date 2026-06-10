import { createI18n } from 'vue-i18n';
import yaml from 'yamljs';

// Import your language files
import ua from '../locales/ua.json';
import en from '../locales/en.json';


// Function to load YAML file
function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.yaml$/i);
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = yaml.load(locales(key));
    }
  });
  return messages;
}

// const messages = loadLocaleMessages();

const messages = {ua,en};

console.log(messages)

const i18n = createI18n({
  locale: 'ua', // Set default locale
  fallbackLocale: 'en', // Set fallback locale
  messages, // Set locale messages
});

export default i18n;
