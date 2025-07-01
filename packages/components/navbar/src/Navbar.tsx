import React from 'react';

import * as S from './Navbar.styles';
import { type NavbarProps } from './Navbar.types';

const Navbar = ({
  className,
  color,
  logo,
  description,
  children,
  actions,
  additionalNodes,
  alertNotification,
}: NavbarProps) => {
  return (
    <S.Navbar className={`ds-navbar ${className || ''}`} color={color}>
      {typeof logo === 'string' ? <img src={logo} alt="" /> : logo}
      <S.NavbarDivider />
      <S.NavbarDescription>{description}</S.NavbarDescription>
      {alertNotification && (
        <>
          <S.NavbarAlertNotification>
            {alertNotification}
          </S.NavbarAlertNotification>
          <S.NavbarDivider />
        </>
      )}
      {additionalNodes?.map((node) => (
        <>
          <S.AdditionalNode>{node}</S.AdditionalNode>
          <S.NavbarDivider />
        </>
      ))}
      <S.NavbarActions>
        <div>
          <S.NavbarActionsWrapper>{actions}</S.NavbarActionsWrapper>
        </div>
        {children}
      </S.NavbarActions>
    </S.Navbar>
  );
};

Navbar.Divider = S.NavbarDivider;
export default Navbar;
