import React from 'react';

import Icon, {
  AngleLeftS,
  AngleRightS,
  DoubleAngleLeftS,
  DoubleAngleRightS,
} from '@synerise/ds-icon';

import * as S from './Navbar.styles';
import type { NavbarProps } from './Navbar.types';

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const {
    title,
    onTitleClick,
    hidePrev,
    hideNext,
    onLongPrev,
    onLongNext,
    onShortPrev,
    onShortNext,
    inactivePrev,
    inactiveNext,
    singleStep,
  } = props;

  return (
    <S.Container className="ds-date-picker-nav">
      <S.ArrowContainer>
        {onLongPrev && !hidePrev ? (
          <S.NavButton
            data-testid="datapicker-long-prev"
            disabled={inactivePrev}
            mode="single-icon"
            role="button"
            type="ghost"
            onClick={onLongPrev}
          >
            <Icon
              component={singleStep ? <AngleLeftS /> : <DoubleAngleLeftS />}
            />
          </S.NavButton>
        ) : (
          <S.ArrowPlaceholder className="arrow-placeholder long-prev" />
        )}
        {!singleStep &&
          (onShortPrev && !hidePrev ? (
            <S.NavButton
              data-testid="datapicker-short-prev"
              disabled={inactivePrev}
              mode="single-icon"
              role="button"
              type="ghost"
              onClick={onShortPrev}
            >
              <Icon component={<AngleLeftS />} />
            </S.NavButton>
          ) : (
            <S.ArrowPlaceholder className="arrow-placeholder short-prev" />
          ))}
      </S.ArrowContainer>
      <S.Text data-testid="ds-date-picker-nav-title">
        {onTitleClick ? <S.Link onClick={onTitleClick}>{title}</S.Link> : title}
      </S.Text>
      <S.ArrowContainer>
        {!singleStep &&
          (onShortNext && !hideNext ? (
            <S.NavButton
              data-testid="datapicker-short-next"
              disabled={inactiveNext}
              mode="single-icon"
              role="button"
              type="ghost"
              onClick={onShortNext}
            >
              <Icon component={<AngleRightS />} />
            </S.NavButton>
          ) : (
            <S.ArrowPlaceholder className="arrow-placeholder short-next" />
          ))}
        {onLongNext && !hideNext ? (
          <S.NavButton
            data-testid="datapicker-long-next"
            disabled={inactiveNext}
            mode="single-icon"
            role="button"
            type="ghost"
            onClick={onLongNext}
          >
            <Icon
              component={singleStep ? <AngleRightS /> : <DoubleAngleRightS />}
            />
          </S.NavButton>
        ) : (
          <S.ArrowPlaceholder className="arrow-placeholder long-next" />
        )}
      </S.ArrowContainer>
    </S.Container>
  );
};
export default Navbar;
