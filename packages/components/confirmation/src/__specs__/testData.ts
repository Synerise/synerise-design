import type { ListItemProps } from '@synerise/ds-list-item';
import type { RadioProps } from '@synerise/ds-radio';

import type { ConfirmationType } from '../Confirmation.types';

export const RELATED_OBJECTS_LABEL = 'related objects button';
export const PROPS = {
  title: 'TITLE',
  description: 'DESCRIPTION',
  icon: 'ICON',
  mainButtonProps: {
    'data-testid': 'main-button',
  },
  secondaryButtonProps: {
    'data-testid': 'cancel-button',
  },
  onOk: vi.fn(),
  onCancel: vi.fn(),
  texts: {
    relatedObjectsButtonLabel: RELATED_OBJECTS_LABEL,
  },
};
// Each confirmation type maps to a semantic ds-button `type` (rendered as an `ant-btn-<type>` class).
export const BUTTON_TYPE_TEST_CASES: {
  type: ConfirmationType;
  buttonType: string;
}[] = [
  { type: 'negative', buttonType: 'danger' },
  { type: 'success', buttonType: 'success' },
  { type: 'warning', buttonType: 'warning' },
  { type: 'informative', buttonType: 'primary' },
];
export const ITEM_NAME = 'TEST1';
export const ITEMS: ListItemProps[] = [
  {
    text: ITEM_NAME,
  },
];
export const DECISION_OPTIONS: RadioProps[] = [
  {
    value: 'option 1',
  },
  {
    value: 'option 2',
  },
];
