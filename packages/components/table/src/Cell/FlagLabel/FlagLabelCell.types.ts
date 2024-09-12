import { CountryCode } from '@synerise/ds-flag/dist/Flag.types';
import { WithHTMLAttributes } from '@synerise/ds-utils';

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
