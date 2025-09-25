import React, { type MouseEvent, useState } from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, { CloseS } from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './Tag.styles';
import { getColorText } from './Tag.styles';
import { type TagProps, TagShape } from './Tag.types';
import { useDefaultTexts } from './hooks/useDefaultTexts';

const Tag = ({
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
  prefixel,
  suffixel,
  texts,
  asPill,
  dashed,
  tooltipProps,
  ...htmlAttributes
}: TagProps) => {
  const theme = useTheme();
  const allTexts = useDefaultTexts(texts);

  const isDefaultType =
    shape && [TagShape.DEFAULT_ROUND, TagShape.DEFAULT_SQUARE].includes(shape);
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

  const onRemoveCall = () => !!onRemove && !!id && onRemove(id);
  const renderPrefixel = () => {
    if (typeof prefixel === 'string' || typeof prefixel === 'number') {
      return (
        <S.PrefixWrapper iconHover={isIconHovered}>{prefixel}</S.PrefixWrapper>
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

  const handleMouseOver = (event: MouseEvent<HTMLDivElement>) => {
    setIsIconHovered(true);

    htmlAttributes.onMouseOver?.(event);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    setIsIconHovered(false);

    htmlAttributes.onMouseLeave?.(event);
  };

  const renderedTag = (
    <S.Tag
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
      hasImage={!!image}
      iconHover={isIconHovered}
      asPill={asPill}
      dashed={dashed}
      {...htmlAttributes}
    >
      <S.Content iconHover={isIconHovered}>
        {image && isDefaultType && <img src={image} alt="" />}
        {!!prefixel && renderPrefixel()}
        <S.TagName>{name}</S.TagName>
        {!!suffixel && renderSuffixel()}
        {isRemovable && (
          <Tooltip title={allTexts.deleteTooltip} open={isIconHovered}>
            <S.RemoveButton
              onClick={onRemoveCall}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              data-testid="remove-btn"
            >
              <Icon
                className="icon"
                component={<CloseS />}
                size={24}
                color={getColorText(theme, color)}
              />
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
};

export default Tag;
