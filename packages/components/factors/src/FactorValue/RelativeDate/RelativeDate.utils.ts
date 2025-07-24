import {
  type RelativeDateFactorTexts,
  type RelativeDateFactorTextsString,
  RelativeDateKeysString,
  type RelativeDateValueType,
} from '../../Factors.types';

const isTextsKey = (
  key: string,
): key is keyof RelativeDateFactorTextsString => {
  return ([...RelativeDateKeysString] as string[]).includes(key);
};

export const getTranslation = (
  texts: RelativeDateFactorTextsString,
  key: string,
): string => {
  const lowercaseKey = key.toLowerCase();
  return isTextsKey(lowercaseKey) ? texts[lowercaseKey] : key;
};

export const defaultTriggerModifier = (
  value: RelativeDateValueType,
  texts: RelativeDateFactorTexts,
) => {
  const relation = value.temporalModifier < 0 ? texts.before : texts.after;
  const absValue = Math.abs(value.temporalModifier);
  return `${absValue} ${getTranslation(
    texts,
    value.temporalUnit,
  ).toLocaleLowerCase()} ${relation.toLocaleLowerCase()} ${texts.currentDatetime}`;
};
