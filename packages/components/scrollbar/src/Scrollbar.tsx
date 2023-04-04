import * as React from 'react';
import Icon, { SpinnerM } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

import * as S from './Scrollbar.styles';
import { ScrollbarProps } from './Scrollbar.types';
import { DnDScrollbar } from './DnDScrollbar';
import { VirtualScrollbar } from './VirtualScrollbar';

const Scrollbar = React.forwardRef<HTMLElement, ScrollbarProps>(
  ({ children, loading, withDnd, fetchData, ...props }, forwardedRef) => {
    const Component = withDnd ? DnDScrollbar : VirtualScrollbar;

    const renderScrollbar = React.useMemo(() => {
      return (
        <Component {...props} fetchData={fetchData} ref={forwardedRef}>
          {children}
        </Component>
      );
    }, [children, fetchData, forwardedRef, props]);

    return (
      <S.ScrollbarContainer>
        {renderScrollbar}
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
