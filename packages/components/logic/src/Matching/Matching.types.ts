import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type MatchingTexts = {
  matching: string;
  notMatching: string;
};

export type MatchingProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    matching: boolean;
    sentence?: string;
    onChange: (matching: boolean) => void;
    texts?: Partial<MatchingTexts>;
    readOnly?: boolean;
  }
>;
