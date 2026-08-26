import dsMessages from '../../../i18n';

export const getLangForCode = (code: string): string => code.substring(0, 2);

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
