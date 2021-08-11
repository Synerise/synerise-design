import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { Carousel } from 'antd';
import Button from '@synerise/ds-button';
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
  buttons,
  text,
  typeButton,
  titlePadding,
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

  return (
    <S.AntdPopconfirm
      {...antdProps}
      title={
        <S.PopconfirmContent>
          <S.PopconfirmWrapper>
          <S.PopconfirmContentWrapper>
            <S.PopconfirmHeaderWrapper titlePadding={titlePadding}>
              {icon && <S.PopconfirmIcon>{icon}</S.PopconfirmIcon>}
              <S.PopconfirmTitle>{title}</S.PopconfirmTitle>
            </S.PopconfirmHeaderWrapper>
            <S.PopconfirmTextWrapper>
              {description && <S.PopconfirmDescription >{description}</S.PopconfirmDescription>}
              {withLink && <S.LinkWrapper>{withLink}</S.LinkWrapper>}
            </S.PopconfirmTextWrapper>
          </S.PopconfirmContentWrapper>
            {closeIcon && <S.PopconfirmCloseIcon>{closeIcon}</S.PopconfirmCloseIcon>}
          </S.PopconfirmWrapper>
          {renderImageCarousel}
          {buttons &&
          <S.PopconfirmButtonWrapper>
            <Button type="secondary" >
              {text?.applyButton}
            </Button>
            <S.ButtonWrapper>
            <Button type={typeButton} >
              {text?.cancelButton}
            </Button>
            </S.ButtonWrapper>
          </S.PopconfirmButtonWrapper>}
        </S.PopconfirmContent>
      }
    />
  );
};

Popconfirm.ConfirmMessage = ConfirmMessage;

export default Popconfirm;
