import { IntlShape } from 'react-intl';

export type Props = {
  isOn: boolean;
  statusInnerHtml?: { __html: string };
  popConfirmProps?: object;
  onModalButtonClick?: () => void;
  onRemoveFilterButtonClick?: () => void;
  onOpenModalButtonClick?: () => void;
  intl: IntlShape;
  translations?: Texts;
};

export type Texts = {
  clearFilter?: string;
  changeConditions?: string;
  enableFilter?: string;

}