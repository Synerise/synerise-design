import type { ReactNode } from 'react';

import type { ButtonProps } from '@synerise/ds-button';
import type { ListItemProps } from '@synerise/ds-list-item';
import type { ModalProps } from '@synerise/ds-modal';
import type { RadioProps } from '@synerise/ds-radio';
import type { DataAttributes } from '@synerise/ds-utils';

export type ConfirmationType =
  | 'success'
  | 'warning'
  | 'negative'
  | 'informative';

export type ConfirmationButtonProps = Pick<
  ButtonProps,
  'mode' | 'loading' | 'readOnly' | 'disabled' | 'tagProps'
> &
  DataAttributes;

export type ConfirmationTexts = {
  mainButtonLabel: ReactNode;
  secondaryButtonLabel: ReactNode;
  relatedObjectsButtonLabel: ReactNode;
  relatedObjectsTitle: ReactNode;
  batchActionItemsTitle: ReactNode;
  decisionTitle: ReactNode;
};

export type RelatedObjectsModalProps = {
  goBack: () => void;
  content: ReactNode;
  title: ReactNode;
};

export type BatchItemsListProps<ItemType extends ListItemProps> = {
  items: ItemType[];
  title: ReactNode;
};

export type DecisionSectionProps = {
  options: RadioProps[];
  title: ReactNode;
};

export type DisplayMode = 'default' | 'related-objects';

type SharedProps = Pick<
  ModalProps,
  'open' | 'title' | 'zIndex' | 'onCancel' | 'onOk'
> & {
  title: ReactNode;

  texts?: Partial<ConfirmationTexts>;
  /**
   * Defines button & icon colors
   */
  type: ConfirmationType;
  mainButtonProps?: ConfirmationButtonProps;
  secondaryButtonProps?: ConfirmationButtonProps;
};

export type ConfirmationProps<ItemType extends ListItemProps> = SharedProps & {
  description?: ReactNode;
  icon: ReactNode;
  /**
   * Renders a link in footer to show table with related objects affected by the action
   */
  relatedObjects?: ReactNode;
  /**
   * Renders list of items that are affected by the action (batch actions confirmation)
   */
  batchActionItems?: BatchItemsListProps<ItemType>['items'];
  /**
   * Renders list of action options as a radio selection
   */
  decisionOptions?: DecisionSectionProps['options'];
  /**
   * Additional info displayed below description in a rounded frame
   */
  additionalInfo?: ReactNode;
  /**
   * Additional custom footer component like custom actions
   */
  customFooterComponent?: ReactNode;
};

export type PromptProps = SharedProps & {
  content?: ReactNode;
};
