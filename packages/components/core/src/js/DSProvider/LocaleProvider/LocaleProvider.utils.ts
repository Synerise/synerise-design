import dsMessages from '../../../i18n';
import antMessages from './antLocales';

export const getLangForCode = (code: string): string => code.substring(0, 2);

export const getAntMessages = (lang: string) => {
  switch (lang) {
    case 'pl':
    case 'en':
    case 'fr':
    case 'pt':
    case 'es':
      return antMessages[lang];
    default:
      return antMessages.default;
  }
};

export const getDSMessages = (lang: string) => {
  switch (lang) {
    case 'pl':
    case 'en':
    case 'pt':
    case 'es':
      return dsMessages[lang];
    default:
      return dsMessages.default;
  }
};
