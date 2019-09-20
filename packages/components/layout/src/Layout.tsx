import * as React from 'react';
import * as S from './Layout.styles';

interface Style<T> {
  left?: T;
  leftInner?: T;
  main?: T;
  mainInner?: T;
  right?: T;
  rightInner?: T;
}

export type LayoutProps = {
  header?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  transitionTime?: number;
  transitionName?: string;
  styles?: Style<object>;
};

const Layout: React.FC<LayoutProps> = props => {
  const { header, left, right, children, className, styles, transitionName, transitionTime } = props;
  return (
    <S.LayoutContainer className={className}>
      {header ? <S.LayoutHeader>{header}</S.LayoutHeader> : null}
      <S.LayoutBody>
        <S.Transitions
          transitionName={transitionName}
          transitionEnterTimeout={transitionTime}
          transitionLeaveTimeout={transitionTime}
          timeout={transitionTime}
        >
          <>
            {left ? (
              <S.LayoutSidebar transitionTime={transitionTime} timeout={transitionTime} style={styles && styles.left}>
                <S.LayoutSidebarInner style={styles && styles.leftInner}>{left}</S.LayoutSidebarInner>
              </S.LayoutSidebar>
            ) : null}
          </>
        </S.Transitions>
        <S.LayoutMain data-popup-container style={styles && styles.main}>
          <S.LayoutMainInner style={styles && styles.mainInner}>{children}</S.LayoutMainInner>
        </S.LayoutMain>
        <S.Transitions
          transitionName={transitionName}
          transitionEnterTimeout={transitionTime}
          transitionLeaveTimeout={transitionTime}
          timeout={transitionTime}
        >
          <>
            {right ? (
              <S.LayoutSidebar transitionTime={transitionTime} style={styles && styles.right}>
                <S.LayoutSidebarInner style={styles && styles.rightInner}>{right}</S.LayoutSidebarInner>
              </S.LayoutSidebar>
            ) : null}
          </>
        </S.Transitions>
      </S.LayoutBody>
    </S.LayoutContainer>
  );
};

Layout.defaultProps = {
  transitionTime: 1,
  transitionName: 'default',
};

export default Layout;
