import React, { useEffect, useMemo, useRef, useState } from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { Carousel } from 'antd';
import AntdPopconfirm from 'antd/lib/popconfirm';
import { useOnClickOutside } from '@synerise/ds-utils';
import * as S from './Popconfirm.styles';
import ConfirmMessage from './ConfirmMessage/ConfirmMessage';
import { PopconfirmType } from './Popconfirm.types';

const Popconfirm: PopconfirmType = ({
  icon,
  title,
  description,
  images,
  imagesAutoplay,
  imagesAutoplaySpeed = 5000,
  withLink,
  closeIcon,
  titlePadding,
  onCancel,
  cancelButtonProps,
  onConfirm,
  okButtonProps,
  okType = 'primary',
  hideButtons,
  cancelText,
  okText,
  buttonsAlign,
  disabled,
  ...antdProps
}) => {
  const renderImageCarousel = useMemo(() => {
    return (
      images?.length && (
        <Carousel autoplay={imagesAutoplay} autoplaySpeed={imagesAutoplaySpeed} effect="fade">
          {images.map(image => (
            <S.PopconfirmImage key={image} src={image} />
          ))}
        </Carousel>
      )
    );
  }, [images, imagesAutoplay, imagesAutoplaySpeed]);
  const popupRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean | undefined>(undefined);
  useOnClickOutside(popupRef, () => {
    setVisible(false);
  });

  useEffect(() => {
    if (!visible && antdProps.visible) {
      setVisible(antdProps.visible);
    }
  }, [visible, antdProps.visible]);

  return disabled ? (
    <>{antdProps.children}</>
  ) : (
    <AntdPopconfirm
      {...antdProps}
      disabled={disabled}
      visible={visible}
      onVisibleChange={(isVisible: boolean): void => {
        if (antdProps.onVisibleChange) {
          antdProps.onVisibleChange(isVisible);
        } else if (isVisible !== visible) {
          setVisible(isVisible);
        }
      }}
      title={
        <S.PopconfirmContent ref={popupRef} buttonsAlign={buttonsAlign}>
          <S.PopconfirmWrapper>
            <S.PopconfirmContentWrapper>
              <S.PopconfirmHeaderWrapper>
                {icon && <S.PopconfirmIcon>{icon}</S.PopconfirmIcon>}
                <S.PopconfirmTitle>
                  <>{title}</>
                </S.PopconfirmTitle>
              </S.PopconfirmHeaderWrapper>
              <S.PopconfirmTextWrapper>
                {description && (
                  <S.PopconfirmDescription titlePadding={!titlePadding}>{description}</S.PopconfirmDescription>
                )}
                {withLink && <S.LinkWrapper>{withLink}</S.LinkWrapper>}
              </S.PopconfirmTextWrapper>
            </S.PopconfirmContentWrapper>
            {closeIcon && (
              <S.PopconfirmCloseIcon onClick={(): void => setVisible(false)} titlePadding={titlePadding}>
                {closeIcon}
              </S.PopconfirmCloseIcon>
            )}
          </S.PopconfirmWrapper>
          {renderImageCarousel}
          {!hideButtons && (
            <S.PopconfirmButtonWrapper>
              <S.PopconfirmButton
                type="secondary"
                {...cancelButtonProps}
                onClick={(e): void => {
                  onCancel && onCancel(e);
                  setVisible(false);
                  cancelButtonProps?.onClick && cancelButtonProps.onClick(e);
                }}
              >
                {cancelText}
              </S.PopconfirmButton>
              <S.PopconfirmButton
                type={okType}
                {...okButtonProps}
                onClick={(e): void => {
                  onConfirm && onConfirm(e);
                  setVisible(false);
                  okButtonProps?.onClick && okButtonProps.onClick(e);
                }}
              >
                {okText}
              </S.PopconfirmButton>
            </S.PopconfirmButtonWrapper>
          )}
        </S.PopconfirmContent>
      }
    />
  );
};

Popconfirm.ConfirmMessage = ConfirmMessage;

export default Popconfirm;
