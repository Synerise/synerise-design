import React, { forwardRef } from 'react';

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
    {
      children,
      className,
      loading,
      withDnd,
      fetchData,
      overscrollBehavior = 'contain',
      ...props
    },
    forwardedRef,
  ) => {
    const Component = withDnd ? DnDScrollbar : VirtualScrollbar;

    return (
      <S.ScrollbarContainer
        overscrollBehavior={overscrollBehavior}
        className={className}
      >
        <Component
          {...props}
          overscrollBehavior={overscrollBehavior}
          fetchData={fetchData}
          ref={forwardedRef}
        >
          {children}
        </Component>
        {loading && (
          <S.LoaderWrapper>
            <S.Loader loading={loading}>
              <Icon
                component={<SpinnerM />}
                color="var(--ds-color-icon-base-default)"
              />
            </S.Loader>
          </S.LoaderWrapper>
        )}
      </S.ScrollbarContainer>
    );
  },
);

export default Scrollbar;
