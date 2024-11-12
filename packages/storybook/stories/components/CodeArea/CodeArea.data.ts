const languages = ['json', 'javascript', 'css', 'html'] as const;
export type SyntaxType = typeof languages[number];
export const AVAILABLE_SYNTAXES = languages.map((language: SyntaxType) => ({
  language,
  label: language === 'javascript' ? 'Javascript' : language.toUpperCase(),
}));
