import { StorageService } from 'src/services/storage';

const locale = StorageService.getLocale() || 'en-US';
let messages = {};
try {
  messages = require(`src/i18n/${locale}`).default;
}
catch (err) {
  console.error(err);
  //fallback locale
  messages = require(`src/i18n/en-US`).default;
}

const i18n = {
  locale,
  messages,
  t: function (key, args) {
    let value = key.split('.').reduce((p, c) => p?.[c], messages);
    if (value && args) {
      const names = Object.keys(args);
      const vals = Object.values(args);
      return new Function(...names, `return \`${value}\`;`)(...vals);
    }
    return value || key;
  }
};

const $t = i18n.t;
export { i18n, $t }
