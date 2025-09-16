import React, { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

import Icon, { AngleDownS, CloseM } from '@synerise/ds-icon';

import * as S from './Toast.styles';
import {
  type ShowToastProps,
  type ToastCustomisationOptions,
  type ToastProps,
  type ToastType,
} from './Toast.types';
import { ICONS } from './constants';

export const Toast = ({
  type,
  message,
  description,
  expander,
  expandedContent,
  withClose,
  customIcon,
  expanded,
  onExpand,
  onCloseClick,
  button,
  ...htmlAttributes
}: ToastProps) => {
  const hasToastContent = button || description || expandedContent;
  const toastContent = hasToastContent && (
    <S.AlertContent
      hasBottomMargin={Boolean(
        button || description || (expandedContent && expanded),
      )}
    >
      {description && (
        <S.AlertDescription
          expandedContent={!!expandedContent}
          button={!!button}
        >
          {description}
        </S.AlertDescription>
      )}
      {expandedContent && (
        <S.ListWrapper description={description} visible={expanded}>
          {expandedContent}
        </S.ListWrapper>
      )}
      {button}
    </S.AlertContent>
  );

  const iconComponentForType = useMemo(() => {
    return ICONS[type];
  }, [type]);

  const expandContent = useCallback(() => {
    onExpand && onExpand(!expanded);
  }, [onExpand, expanded]);

  return (
    <S.Container toastType={type} data-toastType={type} {...htmlAttributes}>
      <S.IconWrapper>
        {customIcon || <Icon component={iconComponentForType} />}
      </S.IconWrapper>

      <S.WrapperSectionMessage>
        <S.AlertMessage
          noToastContent={!hasToastContent}
          hasClose={!!withClose}
          hasExpander={!!expander}
        >
          {message}
        </S.AlertMessage>

        <S.ButtonWrapper>
          {expander && (
            <S.IconExpanderWrapper onClick={expandContent} expanded={expanded}>
              <Icon component={<AngleDownS />} size={24} />
            </S.IconExpanderWrapper>
          )}
          {withClose && (
            <S.IconCloseWrapper onClick={onCloseClick}>
              <Icon component={<CloseM />} />
            </S.IconCloseWrapper>
          )}
        </S.ButtonWrapper>

        {toastContent}
      </S.WrapperSectionMessage>
    </S.Container>
  );
};

export const showToast = (
  type: ToastType,
  props: ShowToastProps,
  options?: ToastCustomisationOptions,
) => {
  return toast.custom(<Toast {...props} type={type} />, options);
};

Toast.success = (
  props: ShowToastProps,
  options?: ToastCustomisationOptions,
) => {
  return showToast('success', props, options);
};
Toast.error = (props: ShowToastProps, options?: ToastCustomisationOptions) => {
  return showToast('negative', props, options);
};
Toast.info = (props: ShowToastProps, options?: ToastCustomisationOptions) => {
  return showToast('informative', props, options);
};
Toast.warning = (
  props: ShowToastProps,
  options?: ToastCustomisationOptions,
) => {
  return showToast('warning', props, options);
};
