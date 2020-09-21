import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { Carousel } from 'antd';
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
          <S.PopconfirmContentWrapper>
            {icon && <S.PopconfirmIcon>{icon}</S.PopconfirmIcon>}
            <S.PopconfirmTextWrapper>
              <S.PopconfirmTitle>{title}</S.PopconfirmTitle>
              {description && <S.PopconfirmDescription>{description}</S.PopconfirmDescription>}
            </S.PopconfirmTextWrapper>
          </S.PopconfirmContentWrapper>
          {renderImageCarousel}
        </S.PopconfirmContent>
      }
    />
  );
};

Popconfirm.ConfirmMessage = ConfirmMessage;

export default Popconfirm;
