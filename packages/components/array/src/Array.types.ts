import type { ReactNode } from 'react';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

type ArrayTextsString = 'placeholder' | 'copyTooltip' | 'copiedTooltip';

type ArrayTextsReactNode = 'addButton' | 'values' | 'show' | 'more' | 'less';

export type ArrayTexts = {
  [key in ArrayTextsString]: string;
} & {
  [key in ArrayTextsReactNode]: ReactNode;
};

export type ArrayTriggerProps = Pick<ArrayProps, 'value' | 'readOnly' | 'disabled'>;

export type ArrayItem = string;

export type ArrayProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    getPopupContainer: (node: HTMLElement) => HTMLElement;
    readOnly?: boolean;
    disabled?: boolean;
    value: ArrayItem[];
    onValueChange: (value: ArrayItem[]) => void;
    renderCustomTrigger?: (triggerProps: ArrayTriggerProps) => ReactNode;
    texts?: Partial<ArrayTexts>;
  }
>;

export type ArrayModalProps = {} & Pick<ArrayProps, 'value' | 'onValueChange'>;
