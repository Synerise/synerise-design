import * as React from 'react';
import Button, { ButtonGroupProps } from 'antd/lib/button';
import { Props } from './ButtonGroup.types';
import * as S from './ButtonGroup.styles';

const ButtonGroup: React.FC<Props & ButtonGroupProps> = ({ children, title, description, size }) => (
  <S.Container>
    {title && <S.Title>{title}</S.Title>}
    <Button.Group size={size}>{children}</Button.Group>
    {description && <S.Description>{description}</S.Description>}
  </S.Container>
);

export default ButtonGroup;
