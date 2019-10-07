import * as React from 'react';
import { Props } from './Tag.types';
import * as S from './Tag.styles';

export enum TagShape {
  SINGLE_CHARACTER_ROUND = 'single_character_round',
  SINGLE_CHARACTER_SQUARE = 'single_character_square',
  DEFAULT_ROUND = 'default_round',
  DEFAULT_SQUARE = 'default_square',
  SMALL_ROUND = 'small_round',
  SMALL_SQUARE = 'small_square',
  STATUS_NEUTRAL = 'status_custom',
  STATUS_SUCCESS = 'status_active',
  STATUS_ERROR = 'status_inactive',
  STATUS_WARNING = 'status_paused',
}

const Tag: React.FC<Props> = ({ name, className, removable, image, shape, color, textColor, onRemove }: Props) => {
  const isDefaultType = [TagShape.DEFAULT_ROUND, TagShape.DEFAULT_SQUARE].includes(shape);
  const isDefaultRound = shape === TagShape.DEFAULT_ROUND;

  return (
    <S.Tag className={className} shape={shape} color={color} textColor={textColor} removable={removable}>
      {image && isDefaultType && <img src={image} alt="" />}
      <span>{name}</span>
      {removable && isDefaultRound && (
        <button type="button" onClick={onRemove}>
          x
        </button>
      )}
    </S.Tag>
  );
};

Tag.defaultProps = {
  shape: TagShape.DEFAULT_ROUND,
};

export default Tag;
