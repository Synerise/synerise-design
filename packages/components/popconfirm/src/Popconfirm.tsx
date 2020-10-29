import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { Carousel } from 'antd';
import { useOnClickOutside } from '@synerise/ds-utils';
import * as S from './Popconfirm.styles';
import ConfirmMessage from './ConfirmMessage/ConfirmMessage';
import { PopconfirmType } from './Popconfirm.types';

const DEFAULT_OK = 'OK';
const DEFAULT_CANCEL = 'Cancel';
const Popconfirm: PopconfirmType = ({
  icon,
  title,
  description,
  images,
  imagesAutoplay,
  imagesAutoplaySpeed = 5000,
  onCancel,
  cancelButtonProps,
  cancelText = DEFAULT_CANCEL,
  onConfirm,
  okButtonProps,
  okText = DEFAULT_OK,
  okType = 'primary',
  children,
  disabled,
  ...antdProps
}) => {
  const popupRef = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState<boolean | undefined>( undefined);
  useOnClickOutside(popupRef, () => {
    setVisible(false);
  });
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
  return (
    <S.AntdPopconfirm
      {...antdProps}
      disabled={disabled}
      visible={visible}
      title={
        <S.PopconfirmContent ref={popupRef}>
          <S.PopconfirmContentWrapper>
            {icon && <S.PopconfirmIcon>{icon}</S.PopconfirmIcon>}
            <S.PopconfirmTextWrapper>
              <S.PopconfirmTitle>{title}</S.PopconfirmTitle>
              {description && <S.PopconfirmDescription>{description}</S.PopconfirmDescription>}
            </S.PopconfirmTextWrapper>
          </S.PopconfirmContentWrapper>
          {renderImageCarousel}
          <S.PopconfirmButtonsWrapper>
            <S.PopconfirmButton
              type="secondary"
              onClick={(e): void => {
                onCancel && onCancel(e);
                setVisible(false);
              }}
              {...cancelButtonProps}
            >
              {cancelText || DEFAULT_CANCEL}
            </S.PopconfirmButton>
            <S.PopconfirmButton
              type={okType}
              onClick={(e): void => {
                onConfirm && onConfirm(e);
                setVisible(false);
              }}
              {...okButtonProps}
            >
              {okText || DEFAULT_OK}
            </S.PopconfirmButton>
          </S.PopconfirmButtonsWrapper>
        </S.PopconfirmContent>
      }
    >
      <S.PopconfirmChildren role="main" className="ds-popconfirm-children" onClick={(): void => setVisible(!disabled)}>
        {children}
      </S.PopconfirmChildren>
    </S.AntdPopconfirm>
  );
};

Popconfirm.ConfirmMessage = ConfirmMessage;

export default Popconfirm;
