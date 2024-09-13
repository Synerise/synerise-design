import type { ReactNode } from 'react';
import type { WithHTMLAttributes } from '@synerise/ds-utils';

type ArrayTextsString = 'placeholder' | 'copyTooltip' | 'copiedTooltip';

type ArrayModalTextsNode = 'modalTitle';
type ArrayTriggerTextsNode = 'buttonPlaceholder' | 'values';
type ArrayTextsReactNode =
  | ArrayModalTextsNode
  | ArrayTriggerTextsNode
  | 'addButton'
  | 'values'
  | 'show'
  | 'more'
  | 'less';

type ArrayTriggerTexts = {
  [key in ArrayTriggerTextsNode]: ReactNode;
};
type ArrayModalTexts = {
  [key in ArrayModalTextsNode]: ReactNode;
};

export type ArrayTexts = {
  [key in ArrayTextsString]: string;
} & {
  [key in ArrayTextsReactNode]: ReactNode;
};

export type ArrayTriggerProps = Pick<ArrayProps, 'value' | 'readOnly' | 'disabled'> & {
  onClick: () => void;
  texts: ArrayTriggerTexts;
};

export type ArrayItem = string;

export type ArrayProps = WithHTMLAttributes<
  HTMLDivElement,
  {
    getPopupContainer: (node: HTMLElement) => HTMLElement;
    readOnly?: boolean;
    disabled?: boolean;
    open?: boolean;
    value: ArrayItem[];
    onValueChange: (value: ArrayItem[]) => void;
    renderCustomTrigger?: (triggerProps: ArrayTriggerProps) => ReactNode;
    texts?: Partial<ArrayTexts>;
  }
>;

export type ArrayModalProps = {
  visible?: boolean;
  texts: ArrayModalTexts;
  hideModal: () => void;
} & Pick<ArrayProps, 'value' | 'onValueChange'>;
