import * as React from 'react';
import { Props } from './Tags.types';
import * as S from './Tags.styles';
import Tag from './Tag';

const Tags: React.FC<Props> = ({ data, tagShape, removable, selected, style, className }: Props) => {
  return (
    <S.Container className={className} style={style}>
      <S.SelectedTags>
        {(data || []).map(tag => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Tag key={tag.key} shape={tagShape} removable={removable} {...tag} />
        ))}
      </S.SelectedTags>
    </S.Container>
  );
};

export default Tags;
