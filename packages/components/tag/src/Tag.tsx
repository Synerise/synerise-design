import React, { forwardRef, type MouseEvent, useRef, useState } from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, { CloseS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import { useDefaultTexts } from './hooks/useDefaultTexts';
import * as S from './Tag.styles';
import { HUG_PADDING, REMOVE_BUTTON_SIZE } from './Tag.styles';
import { type TagProps, TagShape } from './Tag.types';

const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      id,
      name,
      className,
      disabled,
      removable,
      image,
      shape = TagShape.DEFAULT_ROUND && TagShape.DEFAULT_SQUARE,
      color,
      textColor,
      onRemove,
      onClick,
      prefixel: prefixelProp,
      suffixel,
      texts,
      asPill,
      dashed,
      tooltipProps,
      style,
      onMouseEnter,
      onMouseLeave,
      ...htmlAttributes
    },
    ref,
  ) => {
    const theme = useTheme();
    const prefixel =
      prefixelProp ?? (image ? <img src={image} alt="" /> : undefined);
    const allTexts = useDefaultTexts(texts);

    const isDefaultRound = shape === TagShape.DEFAULT_ROUND;
    const isDefaultSquare = shape === TagShape.DEFAULT_SQUARE;
    const isStatusShape =
      shape &&
      [
        TagShape.STATUS_ERROR,
        TagShape.STATUS_NEUTRAL,
        TagShape.STATUS_SUCCESS,
        TagShape.STATUS_WARNING,
      ].includes(shape);
    const isRemovable = removable && (isDefaultRound || isDefaultSquare);
    const isActionable = !disabled && isRemovable;
    const [isIconHovered, setIsIconHovered] = useState(false);
    const [hoverWidth, setHoverWidth] = useState<number>();
    const labelRef = useRef<HTMLSpanElement>(null);
    const isHovered = hoverWidth !== undefined;

    const onRemoveCall = () => !!onRemove && !!id && onRemove(id);
    const renderPrefixel = () => {
      if (typeof prefixel === 'string' || typeof prefixel === 'number') {
        return (
          <S.PrefixWrapper iconHover={isIconHovered}>
            {prefixel}
          </S.PrefixWrapper>
        );
      }
      return (
        <S.DefaultPrefixWrapper iconHover={isIconHovered}>
          {prefixel}
        </S.DefaultPrefixWrapper>
      );
    };
    const renderSuffixel = () => {
      if (typeof suffixel === 'string' || typeof suffixel === 'number') {
        return <S.SuffixWrapper>{suffixel}</S.SuffixWrapper>;
      }
      return <S.DefaultSuffixWrapper>{suffixel}</S.DefaultSuffixWrapper>;
    };

    // The ✕ replaces the suffixel on hover without changing the tag's width:
    // the label truncates instead, down to nothing for a very short label.
    const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
      if (isActionable) {
        const tagRect = event.currentTarget.getBoundingClientRect();
        const labelLeft =
          labelRef.current?.getBoundingClientRect().left ?? tagRect.left;
        const widthForRemoveButton =
          labelLeft - tagRect.left + REMOVE_BUTTON_SIZE + HUG_PADDING;
        setHoverWidth(Math.max(tagRect.width, widthForRemoveButton));
      }
      onMouseEnter?.(event);
    };

    const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
      setHoverWidth(undefined);
      onMouseLeave?.(event);
    };

    const renderedTag = (
      <S.Tag
        ref={ref}
        className={`ds-tag ${className ?? ''}`}
        isStatusShape={isStatusShape}
        shape={shape}
        color={color}
        textColor={textColor}
        removable={removable}
        disabled={disabled}
        isActionable={isActionable}
        onClick={onClick}
        data-testid={typeof id !== 'undefined' ? `tag-${id}` : 'tag'}
        preffixel={!!prefixel}
        suffixel={!!suffixel}
        iconHover={isIconHovered}
        isHovered={isHovered}
        asPill={asPill}
        dashed={dashed}
        {...htmlAttributes}
        style={isHovered ? { ...style, width: hoverWidth } : style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <S.Content iconHover={isIconHovered}>
          {!!prefixel && renderPrefixel()}
          <S.TagName ref={labelRef}>{name}</S.TagName>
          {!!suffixel && renderSuffixel()}
          {isRemovable && (
            <Tooltip
              title={allTexts.deleteTooltip}
              open={isIconHovered}
              zIndex={parseInt(theme.variables['zindex-tooltip'], 10) + 1}
            >
              <S.RemoveButton
                onClick={onRemoveCall}
                onMouseOver={() => setIsIconHovered(true)}
                onMouseLeave={() => setIsIconHovered(false)}
                data-testid="remove-btn"
              >
                <Icon className="icon" component={<CloseS />} size={24} />
              </S.RemoveButton>
            </Tooltip>
          )}
        </S.Content>
      </S.Tag>
    );
    return tooltipProps ? (
      <Tooltip {...tooltipProps}>{renderedTag}</Tooltip>
    ) : (
      renderedTag
    );
  },
);

export default Tag;
