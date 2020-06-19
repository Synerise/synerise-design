import * as React from 'react';
import Icon from '@synerise/ds-icon';

import { AngleLeftS, AngleRightS, ArrowLeftS, ArrowRightS } from '@synerise/ds-icon/dist/icons';
import * as S from './Navbar.styles';
import { NavbarProps } from './Navbar.types';

const hiddenStyle: React.CSSProperties = { display: 'none' };

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { title, onTitleClick, hidePrev, hideNext, onLongPrev, onLongNext, onShortPrev, onShortNext } = props;
  return (
    <S.Container>
      <S.ArrowContainer style={hidePrev ? hiddenStyle : undefined}>
        <Icon component={<ArrowLeftS />} style={!onLongPrev ? hiddenStyle : undefined} onClick={onLongPrev} />
        <Icon component={<AngleLeftS />} style={!onShortPrev ? hiddenStyle : undefined} onClick={onShortPrev} />
      </S.ArrowContainer>
      <S.Text>{onTitleClick ? <S.Link onClick={onTitleClick}>{title}</S.Link> : title}</S.Text>
      <S.ArrowContainer style={hideNext ? hiddenStyle : undefined}>
        <Icon component={<AngleRightS />} style={!onShortNext ? hiddenStyle : undefined} onClick={onShortNext} />
        <Icon component={<ArrowRightS />} style={!onLongNext ? hiddenStyle : undefined} onClick={onLongNext} />
      </S.ArrowContainer>
    </S.Container>
  );
};
export default Navbar;
