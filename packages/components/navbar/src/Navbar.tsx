import * as React from 'react';
import * as S from './Navbar.styles';

export type NavbarProps = {
  color?: string;
  description: string;
  logo: React.ReactNode | string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
};

const Navbar: React.FC<NavbarProps> & { Divider: typeof S.NavbarDivider } = props => {
  const { color, logo, description, children, actions } = props;

  return (
    <S.Navbar color={color}>
      {typeof logo === 'string' ? <img src={logo} alt="" /> : logo}
      <S.NavbarDivider />
      <S.NavbarDescription>{description}</S.NavbarDescription>
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
