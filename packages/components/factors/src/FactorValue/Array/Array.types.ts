import { type ReactNode } from 'react';

import type { RequiredProps } from '@synerise/ds-utils';

import type {
  ArrayProps,
  ArrayValueElement,
  FactorsTexts,
} from '../../Factors.types';

export type ArrayModalProps<ItemType extends 'string' | 'number'> =
  RequiredProps<ArrayProps, 'itemType'> & {
    visible?: boolean;
    readOnly?: boolean;
    onApply: (updatedValue: ArrayValueElement<ItemType>[]) => void;
    onCancel: () => void;
    texts: FactorsTexts;
    value?: ArrayValueElement<ItemType>[];
  };

export type ArrayValueWithID<ItemType extends 'string' | 'number'> = {
  value: ArrayValueElement<ItemType>;
  id: string;
};

export type ArrayCreatorProps<ItemType extends 'string' | 'number'> = Pick<
  ArrayModalProps<ItemType>,
  'itemType' | 'texts' | 'readOnly' | 'limit' | 'collectorSuggestions'
> & {
  value: ArrayValueWithID<ItemType>[];
  onValueChange: (updatedValue: ArrayValueWithID<ItemType>[]) => void;
  searchQuery?: string;
};

export type ArrayCollectorProps<ItemType extends 'string' | 'number'> = Pick<
  ArrayModalProps<ItemType>,
  'itemType' | 'texts' | 'limit' | 'collectorSuggestions'
> & {
  arrayValueCount: number;
  onConfirm: (newItems: ArrayValueWithID<ItemType>[]) => void;
};

export type ArrayRawProps<ItemType extends 'string' | 'number'> = Pick<
  ArrayModalProps<ItemType>,
  'itemType' | 'texts' | 'readOnly' | 'limit'
> & {
  value: ArrayValueWithID<ItemType>[];
  onValueChange: (updatedValue: ArrayValueWithID<ItemType>[]) => void;
  onError: (errorMessage: ReactNode) => void;
};

export type ArrayLimitProps = {
  limit: number;
  count?: number;
  texts: FactorsTexts;
};

export type CopyButtonProps = {
  copyValue: string;
  texts: FactorsTexts;
};
