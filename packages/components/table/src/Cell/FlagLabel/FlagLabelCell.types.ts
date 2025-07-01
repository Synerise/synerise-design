import { type CountryCode } from '@synerise/ds-flag/dist/Flag.types';
import { type WithHTMLAttributes } from '@synerise/ds-utils';

export type FlagLabelProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    countryCode: CountryCode;
    label: string;
  }
>;

/**
 *  @deprecated
 */
export type Props = FlagLabelProps;
