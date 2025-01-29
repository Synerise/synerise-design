import React from 'react';
import Icon, { SpinnerM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import * as S from './Scrollbar.styles';
import { ScrollbarProps, VirtualScrollbarProps } from './Scrollbar.types';
import { DnDScrollbar } from './DnDScrollbar';
import { VirtualScrollbar } from './VirtualScrollbar';

const Scrollbar = React.forwardRef<HTMLElement, ScrollbarProps | VirtualScrollbarProps>(
  ({ children, className, loading, withDnd, fetchData, ...props }, forwardedRef) => {
    const Component = withDnd ? DnDScrollbar : VirtualScrollbar;

    return (
      <S.ScrollbarContainer className={className}>
        <Component {...props} fetchData={fetchData} ref={forwardedRef}>
          {children}
        </Component>
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
