import * as React from 'react';
import * as S from './Navbar.styles';

export type NavbarProps = {
  color?: string;
  description: string;
  logo: React.ReactNode | string;
  avatar: React.ReactNode;
  dropdown: React.ReactNode;
  actions: React.ReactNode;
};

const Navbar: React.FC<NavbarProps> & { Divider: typeof S.NavbarDivider } = props => {
  const { color, logo, description, avatar, dropdown, actions } = props;

  return (
    <S.Navbar color={color}>
      {typeof logo === 'string' ? <img src={logo} alt="" /> : logo}
      <S.NavbarDivider />
      <S.NavbarDescription>{description}</S.NavbarDescription>
      <S.NavbarActions>
        <div>
          <S.NavbarActionsWrapper>{actions}</S.NavbarActionsWrapper>
        </div>
        <S.NavbarDivider />
        {dropdown}
        <S.NavbarDivider />
        {avatar}
      </S.NavbarActions>
    </S.Navbar>
  );
};

Navbar.Divider = S.NavbarDivider;
export default Navbar;
