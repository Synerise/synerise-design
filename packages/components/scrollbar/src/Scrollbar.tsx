import React, { forwardRef } from 'react';

import { useTheme } from '@synerise/ds-core';
import Icon, { SpinnerM } from '@synerise/ds-icon';

import { DnDScrollbar } from './DnDScrollbar';
import * as S from './Scrollbar.styles';
import {
  type ScrollbarProps,
  type VirtualScrollbarProps,
} from './Scrollbar.types';
import { VirtualScrollbar } from './VirtualScrollbar';

const Scrollbar = forwardRef<
  HTMLElement,
  ScrollbarProps | VirtualScrollbarProps
>(
  (
    { children, className, loading, withDnd, fetchData, ...props },
    forwardedRef,
  ) => {
    const theme = useTheme();
    const Component = withDnd ? DnDScrollbar : VirtualScrollbar;

    return (
      <S.ScrollbarContainer className={className}>
        <Component {...props} fetchData={fetchData} ref={forwardedRef}>
          {children}
        </Component>
        {loading && (
          <S.LoaderWrapper>
            <S.Loader loading={loading}>
              <Icon
                component={<SpinnerM />}
                color={theme.palette['grey-600']}
              />
            </S.Loader>
          </S.LoaderWrapper>
        )}
      </S.ScrollbarContainer>
    );
  },
);

export default Scrollbar;
