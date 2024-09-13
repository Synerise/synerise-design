import { ArrayTexts } from 'Array.types';
import { useIntl } from 'react-intl';

export const useTexts = (texts?: Partial<ArrayTexts>): ArrayTexts => {
  const intl = useIntl();

  return {
    modalTitle: intl.formatMessage({ id: 'DS.ARRAY.MODAL_TITLE', defaultMessage: 'Array' }),
    addButton: intl.formatMessage({ id: 'DS.ARRAY.ADD_BUTTON', defaultMessage: 'placeholder' }),
    values: intl.formatMessage({ id: 'DS.ARRAY.VALUES', defaultMessage: 'values' }),
    show: intl.formatMessage({ id: 'DS.ARRAY.SHOW', defaultMessage: 'placeholder' }),
    more: intl.formatMessage({ id: 'DS.ARRAY.MORE', defaultMessage: 'placeholder' }),
    less: intl.formatMessage({ id: 'DS.ARRAY.LESS', defaultMessage: 'placeholder' }),
    buttonPlaceholder: intl.formatMessage({ id: 'DS.ARRAY.BUTTON_PLACEHOLDER', defaultMessage: 'Define array' }),

    placeholder: intl.formatMessage({ id: 'DS.ARRAY.PLACEHOLDER', defaultMessage: 'placeholder' }),
    copyTooltip: intl.formatMessage({ id: 'DS.ARRAY.COPY_TOOLTIP', defaultMessage: 'placeholder' }),
    copiedTooltip: intl.formatMessage({ id: 'DS.ARRAY.COPIED_TOOLTIP', defaultMessage: 'placeholder' }),
    ...(texts || {}),
  };
};
