import type {
  RelativeDateFactorTexts,
  RelativeDateValueType,
} from '../../Factors.types';

export const getTranslation = (
  texts: RelativeDateFactorTexts,
  key: string,
): string => {
  return key.toLocaleLowerCase() in texts
    ? texts[key.toLocaleLowerCase()]
    : key;
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
