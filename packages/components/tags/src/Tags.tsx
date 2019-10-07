import * as React from 'react';
import { Props } from './Tags.types';
import * as S from './Tags.styles';
import Tag from './Tag';

const Tags: React.FC<Props> = ({
  data,
  tagShape,
  onSelectedChange,
  disabled,
  removable,
  selected,
  style,
  className,
}: Props) => {
  const onRemove = (tagKey: string | number): void =>
    onSelectedChange && onSelectedChange(selected.filter(tag => tag.id !== tagKey));

  return (
    <S.Container className={className} style={style}>
      <S.SelectedTags>
        {(selected || []).map(tag => (
          <Tag
            key={tag.id}
            shape={tagShape}
            removable={removable}
            onRemove={removable ? onRemove : undefined}
            disabled={disabled}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...tag}
          />
        ))}
      </S.SelectedTags>
    </S.Container>
  );
};

export default Tags;
