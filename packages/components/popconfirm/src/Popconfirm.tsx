import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { Carousel } from 'antd';
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
  ...antdProps
}) => {
  const renderImageCarousel = React.useMemo(() => {
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
  const popupRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState<boolean | undefined>(undefined);
  useOnClickOutside(popupRef, () => {
    setVisible(false);
  });

  React.useEffect(() => {
    if (!visible && antdProps.visible) {
      setVisible(antdProps.visible);
    }
  }, [visible, antdProps.visible]);

  return (
    <S.AntdPopconfirm
      {...antdProps}
      visible={visible}
      onVisibleChange={(isVisible: boolean): void => {
        if (isVisible !== visible) setVisible(isVisible);
      }}
      title={
        <S.PopconfirmContent ref={popupRef}>
          <S.PopconfirmWrapper>
            <S.PopconfirmContentWrapper>
              <S.PopconfirmHeaderWrapper>
                {icon && <S.PopconfirmIcon>{icon}</S.PopconfirmIcon>}
                <S.PopconfirmTitle>{title}</S.PopconfirmTitle>
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
