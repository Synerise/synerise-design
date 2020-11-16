import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { CloseS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import { Props, TagShape } from './Tag.types';
import * as S from './Tag.styles';

const Tag: React.FC<Props> = ({
  id,
  name,
  className,
  disabled,
  removable,
  image,
  shape,
  color,
  textColor,
  onRemove,
  onClick,
  prefixel,
  suffixel,
}: Props) => {
  const isDefaultType = shape && [TagShape.DEFAULT_ROUND, TagShape.DEFAULT_SQUARE].includes(shape);
  const isDefaultRound = shape === TagShape.DEFAULT_ROUND;
  const isDefaultSquare = shape === TagShape.DEFAULT_SQUARE;
  const isStatusShape =
    shape &&
    [TagShape.STATUS_ERROR, TagShape.STATUS_NEUTRAL, TagShape.STATUS_SUCCESS, TagShape.STATUS_WARNING].includes(shape);
  const isRemovable = removable && (isDefaultRound || isDefaultSquare);
  const isActionable = !disabled && isRemovable;
  const [iconHover, setIconHover] = React.useState(false);

  const onRemoveCall = (): void | false => !!onRemove && !!id && onRemove(id);
  const renderPrefixel = (): React.ReactNode => {
    if (typeof prefixel === 'string' || typeof prefixel === 'number') {
      return <S.PrefixWrapper iconHover={iconHover}>{prefixel}</S.PrefixWrapper>;
    }
    return <S.DefaultPrefixWrapper iconHover={iconHover}>{prefixel}</S.DefaultPrefixWrapper>;
  };
  const renderSuffixel = (): React.ReactNode => {
    if (typeof suffixel === 'string' || typeof suffixel === 'number') {
      return <S.SuffixWrapper>{suffixel}</S.SuffixWrapper>;
    }
    return <S.DefaultSuffixWrapper>{suffixel}</S.DefaultSuffixWrapper>;
  };

  return (
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
      iconHover={iconHover}
    >
      <S.Content iconHover={iconHover}>
        {image && isDefaultType && <img src={image} alt="" />}
        {!!prefixel && renderPrefixel()}
        <S.TagName>{name}</S.TagName>
        {!!suffixel && renderSuffixel()}
        {isRemovable && (
          <Tooltip title="Delete" visible={iconHover}>
            {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
            <S.RemoveButton
              onClick={onRemoveCall}
              onMouseOver={(): void => {
                setIconHover(true);
              }}
              onMouseLeave={(): void => {
                setIconHover(false);
              }}
              data-testid="remove-btn"
            >
              <Icon
                className="icon"
                component={<CloseS />}
                size={24}
                color={color === theme.palette['grey-200'] ? theme.palette['grey-600'] : theme.palette.white}
              />
            </S.RemoveButton>
          </Tooltip>
        )}
      </S.Content>
    </S.Tag>
  );
};

Tag.defaultProps = {
  shape: TagShape.DEFAULT_ROUND && TagShape.DEFAULT_SQUARE,
};

export default Tag;
