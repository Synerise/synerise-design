import { Carousel } from 'antd';
import React, { forwardRef, useEffect, useMemo, useState } from 'react';

import { useTheme } from '@synerise/ds-core';
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  getPlacement,
} from '@synerise/ds-popover';

import ConfirmMessage from './ConfirmMessage/ConfirmMessage';
import { POPOVER_OFFSET_CONFIG } from './Popconfirm.const';
import * as S from './Popconfirm.styles';
import { type PopconfirmProps, type PopconfirmType } from './Popconfirm.types';
import { getTransitionConfig } from './utils/getTransitionConfig';

const Popconfirm = forwardRef<HTMLElement, PopconfirmProps>(
  (
    {
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
      staticVisible,
      children,
      open,
      onOpenChange,
      trigger = 'click',
      asChild = true,
      placement = 'top',
      overlayClassName,
      overlayStyle,
      zIndex,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const renderImageCarousel = useMemo(() => {
      return (
        images?.length && (
          <Carousel
            autoplay={imagesAutoplay}
            autoplaySpeed={imagesAutoplaySpeed}
            effect="fade"
          >
            {images.map((image) => (
              <S.PopconfirmImage key={image} src={image} />
            ))}
          </Carousel>
        )
      );
    }, [images, imagesAutoplay, imagesAutoplaySpeed]);

    const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);

    const floatingPlacement = getPlacement(placement);

    useEffect(() => {
      if (!isOpen && open) {
        setIsOpen(open);
      }
    }, [isOpen, open]);

    const isTriggeredByClick = Array.isArray(trigger)
      ? trigger.includes('click')
      : trigger === 'click';

    const handleOpenChange = (newState: boolean) => {
      setIsOpen(newState);
      onOpenChange?.(newState);
    };

    const handleTriggerClick = () => {
      isTriggeredByClick && setIsOpen(!isOpen);
    };

    return disabled ? (
      <>{children}</>
    ) : (
      <Popover
        placement={floatingPlacement}
        trigger={trigger}
        modal={false}
        open={isOpen}
        onOpenChange={handleOpenChange}
        autoUpdate={true}
        dismissConfig={{
          enabled: !staticVisible,
        }}
        arrowConfig={{ padding: 20 }}
        zIndex={zIndex ?? parseInt(theme.variables['zindex-popconfirm'])}
        offsetConfig={POPOVER_OFFSET_CONFIG}
        getTransitionConfig={getTransitionConfig}
        testId="popconfirm"
        {...rest}
      >
        <PopoverTrigger
          ref={ref}
          asChild={asChild}
          onClick={handleTriggerClick}
        >
          {children}
        </PopoverTrigger>

        <PopoverContent>
          <S.PopconfirmContainer
            className={overlayClassName}
            style={overlayStyle}
          >
            <S.PopconfirmContent buttonsAlign={buttonsAlign}>
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
                      <S.PopconfirmDescription titlePadding={!titlePadding}>
                        {description}
                      </S.PopconfirmDescription>
                    )}
                    {withLink && <S.LinkWrapper>{withLink}</S.LinkWrapper>}
                  </S.PopconfirmTextWrapper>
                </S.PopconfirmContentWrapper>
                {closeIcon && (
                  <S.PopconfirmCloseIcon
                    onClick={() => setIsOpen(false)}
                    titlePadding={titlePadding}
                  >
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
                    onClick={(event) => {
                      onCancel && onCancel(event);
                      setIsOpen(false);
                      cancelButtonProps?.onClick &&
                        cancelButtonProps.onClick(event);
                    }}
                  >
                    {cancelText}
                  </S.PopconfirmButton>
                  <S.PopconfirmButton
                    type={okType}
                    {...okButtonProps}
                    onClick={(event) => {
                      onConfirm && onConfirm(event);
                      setIsOpen(false);
                      okButtonProps?.onClick && okButtonProps.onClick(event);
                    }}
                  >
                    {okText}
                  </S.PopconfirmButton>
                </S.PopconfirmButtonWrapper>
              )}
            </S.PopconfirmContent>
          </S.PopconfirmContainer>
          <PopoverArrow>
            <S.PopconfirmArrowWrapper>
              <S.PopconfirmArrow
                width="15"
                height="7"
                viewBox="0 0 15 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49919 7L2.15928e-05 5.96025e-07L15 1.90737e-06L7.49919 7Z"
                  fill="currentColor"
                />
              </S.PopconfirmArrow>
            </S.PopconfirmArrowWrapper>
          </PopoverArrow>
        </PopoverContent>
      </Popover>
    );
  },
) as PopconfirmType;

/**
 * @deprecated - use named import instead
 *
 * import { ConfirmMessage } from @synerise/ds-popconfirm
 */
Popconfirm.ConfirmMessage = ConfirmMessage;

export default Popconfirm;
