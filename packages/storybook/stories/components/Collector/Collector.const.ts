import { CollectorValue, CollectorTexts } from '@synerise/ds-collector';

export const TEXTS: CollectorTexts = {
  add: 'Add',
  cancel: 'Cancel',
  placeholder: 'Type value',
  toSelect: 'to select',
  toNavigate: 'to navigate',
};

export const getSuggestions = () => {
  const result: CollectorValue[] = [];
  for (let i = 10; i < 36; i++) {
    for (let j = 0; j < 36; j++) {
      result.push({
        text: `Option ${i.toString(36).toUpperCase()}${j.toString(36).toUpperCase()}`,
      });
    }
  }
  return result;
};
