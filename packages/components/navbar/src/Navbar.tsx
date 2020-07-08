import * as React from 'react';
import * as S from './Navbar.styles';

export type NavbarProps = {
  className?: string;
  color?: string;
  description: string;
  logo: React.ReactNode | string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  additionalNodes?: React.ReactNode[];
  suffixel?: React.ReactNode;
};

const Navbar: React.FC<NavbarProps> & { Divider: typeof S.NavbarDivider } = props => {
  const { className, color, logo, description, children, actions, additionalNodes, suffixel } = props;

  return (
    <S.Navbar className={`ds-navbar ${className || ''}`} color={color}>
      {typeof logo === 'string' ? <img src={logo} alt="" /> : logo}
      <S.NavbarDivider />
      <S.NavbarDescription>{description}</S.NavbarDescription>
      {additionalNodes &&
        additionalNodes.map(node => (
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
      <S.WrappedComponent
        addonAfter={!!suffixel && <S.AddonWrapper className="ds-input-suffix">{suffixel}</S.AddonWrapper>}
      />
    </S.Navbar>
  );
};

Navbar.Divider = S.NavbarDivider;
export default Navbar;
