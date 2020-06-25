import * as React from 'react';

import { AngleLeftS, AngleRightS, DoubleAngleLeftM, DoubleAngleRightM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon/dist';
import * as S from './Navbar.styles';
import { NavbarProps } from './Navbar.types';

const hiddenStyle: React.CSSProperties = { display: 'none' };

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const { title, onTitleClick, hidePrev, hideNext, onLongPrev, onLongNext, onShortPrev, onShortNext } = props;
  return (
    <S.Container>
      <S.ArrowContainer style={hidePrev ? hiddenStyle : undefined}>
        <Icon
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          role="button"
          component={<DoubleAngleLeftM />}
          size={14}
          style={!onLongPrev ? hiddenStyle : undefined}
          onClick={onLongPrev}
        />
        <Icon
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          role="button"
          component={<AngleLeftS />}
          style={!onShortPrev ? hiddenStyle : undefined}
          onClick={onShortPrev}
        />
      </S.ArrowContainer>
      <S.Text>{onTitleClick ? <S.Link onClick={onTitleClick}>{title}</S.Link> : title}</S.Text>
      <S.ArrowContainer style={hideNext ? hiddenStyle : undefined}>
        <Icon
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          role="button"
          component={<AngleRightS />}
          style={!onShortNext ? hiddenStyle : undefined}
          onClick={onShortNext}
        />
        <Icon
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          role="button"
          component={<DoubleAngleRightM />}
          size={14}
          style={!onLongNext ? hiddenStyle : undefined}
          onClick={onLongNext}
        />
      </S.ArrowContainer>
    </S.Container>
  );
};
export default Navbar;
