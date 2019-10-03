import * as React from 'react';
import Button from 'antd/lib/button';

import { Props } from './ButtonGroup.types';
import * as S from './ButtonGroup.styles';

export default ({ children, title, description }: Props) => {
  return (
    <S.Container>
      {title && <S.Title>{title}</S.Title>}
      <Button.Group>{children}</Button.Group>
      {description && <S.Description>{description}</S.Description>}
    </S.Container>
  );
};
