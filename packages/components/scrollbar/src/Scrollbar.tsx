import * as React from 'react';
import Icon, { SpinnerM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import * as S from './Scrollbar.styles';
import { ScrollbarProps, VirtualScrollbarProps } from './Scrollbar.types';
import { DnDScrollbar } from './DnDScrollbar';
import { VirtualScrollbar } from './VirtualScrollbar';

const Scrollbar = React.forwardRef<HTMLElement, ScrollbarProps | VirtualScrollbarProps>(
  ({ children, className, loading, withDnd, fetchData, ...props }, forwardedRef) => {
    const Component = withDnd ? DnDScrollbar : VirtualScrollbar;
    const scrollbar = (
      <Component {...props} fetchData={fetchData} ref={forwardedRef}>
        {children}
      </Component>
    );

    return (
      <S.ScrollbarContainer className={className}>
        {scrollbar}
        {loading && (
          <S.LoaderWrapper>
            <S.Loader loading={loading}>
              <Icon component={<SpinnerM />} color={theme.palette['grey-600']} />
            </S.Loader>
          </S.LoaderWrapper>
        )}
      </S.ScrollbarContainer>
    );
  }
);

export default Scrollbar;
