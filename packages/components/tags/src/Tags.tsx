import * as React from 'react';
import { Props } from './Tags.types';
import * as S from './Tags.styles';
import Tag from './Tag/Tag';

const Tags: React.FC<Props> = ({
  data,
  tagShape,
  onSelectedChange,
  disabled,
  removable,
  addable,
  creatable,
  texts,
  selected,
  style,
  className,
}: Props) => {
  const onRemove = (tagKey: string | number): void =>
    onSelectedChange && onSelectedChange(selected.filter(tag => tag.id !== tagKey));

  return (
    <S.Container className={className} style={style}>
      <S.SelectedTags>
        {selected.map(tag => (
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
      {addable && (
        <S.AddButton type="flat">
          {/* TODO(BLOCKED): ADD + ICON HERE */}
          {texts && texts.addButtonLabel && <span>{texts.addButtonLabel}</span>}
        </S.AddButton>
      )}
    </S.Container>
  );
};

Tags.defaultProps = {
  texts: {},
  selected: [],
};

export default Tags;
