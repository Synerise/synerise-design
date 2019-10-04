import * as React from 'react';
import { Props } from './Tags.types';
import * as S from './Tags.styles';
import Tag from './Tag';

const Tags: React.FC<Props> = ({ data, tagShape, selected, style, className }: Props) => {
  if (!data) {
    return (
      // TODO: Replace
      <span>no data</span>
    );
  }

  return (
    <S.Container className={className} style={style}>
      {data.map(tag => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Tag key={tag.key} shape={tagShape} {...tag} />
      ))}
    </S.Container>
  );
};

export default Tags;
