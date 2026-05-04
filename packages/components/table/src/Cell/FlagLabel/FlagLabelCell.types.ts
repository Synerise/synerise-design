import { type CountryCode } from '@synerise/ds-flag';
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
