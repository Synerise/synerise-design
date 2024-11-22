import { CollectorValue, CollectorTexts } from '@synerise/ds-collector';

export const TEXTS: CollectorTexts = {
  add: 'Add',
  cancel: 'Cancel',
  placeholder: 'Type value',
  toSelect: 'to select',
  toNavigate: 'to navigate',
};

const getSuggestions = (text?: string) => {
  const result: CollectorValue[] = [];
  for (let i = 10; i < 36; i++) {
    for (let j = 0; j < 36; j++) {
      result.push({
        text: text || `Option ${i.toString(36).toUpperCase()}-${j.toString(36).toUpperCase()}`,
        id: `option-${i.toString(36).toLowerCase()}-${j.toString(36).toLowerCase()}`
      });
    }
  }
  return result;
};

export const SUGGESTIONS = getSuggestions();
export const SUGGESTIONS_SAME_LABEL = getSuggestions('Option');