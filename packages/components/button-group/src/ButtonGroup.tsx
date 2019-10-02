import * as React from 'react';
import Button from 'antd/lib/button';

import { Props } from './ButtonGroup.types';
import * as S from './ButtonGroup.styles';

export default ({ children, title, description }: Props) => {
  return (
    <S.Container>
      <h4>{title}</h4>
      <Button.Group>{children}</Button.Group>
      <p>{description}</p>
    </S.Container>
  );
};
