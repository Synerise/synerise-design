import { type CountryCode } from '@synerise/ds-flag/dist/Flag.types';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type BaseFlagLabelProps = {
  countryCode: CountryCode;
  label: string;
};

export type FlagLabelProps = WithHTMLAttributes<
  HTMLDivElement,
  BaseFlagLabelProps
>;

/**
 *  @deprecated
 */
export type Props = FlagLabelProps;
