import * as React from 'react';

import { AngleLeftS, AngleRightS, DoubleAngleLeftM, DoubleAngleRightM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import * as S from './Navbar.styles';
import { NavbarProps } from './Navbar.types';

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { title, onTitleClick, hidePrev, hideNext, onLongPrev, onLongNext, onShortPrev, onShortNext } = props;
  return (
    <S.Container className="ds-date-picker-nav">
      <S.ArrowContainer hidden={hidePrev}>
        <S.NavButton mode="single-icon" role="button" type="ghost" hidden={!onLongPrev} onClick={onLongPrev}>
          <Icon component={<DoubleAngleLeftM />} size={14} />
        </S.NavButton>
        <S.NavButton mode="single-icon" role="button" type="ghost" hidden={!onShortPrev} onClick={onShortPrev}>
          <Icon component={<AngleLeftS />} />
        </S.NavButton>
      </S.ArrowContainer>
      <S.Text>{onTitleClick ? <S.Link onClick={onTitleClick}>{title}</S.Link> : title}</S.Text>
      <S.ArrowContainer hidden={hideNext}>
        <S.NavButton mode="single-icon" role="button" type="ghost" hidden={!onShortNext} onClick={onShortNext}>
          <Icon component={<AngleRightS />} />
        </S.NavButton>
        <S.NavButton mode="single-icon" role="button" type="ghost" hidden={!onLongNext} onClick={onLongNext}>
          <Icon component={<DoubleAngleRightM />} size={14} />
        </S.NavButton>
      </S.ArrowContainer>
    </S.Container>
  );
};
export default Navbar;
