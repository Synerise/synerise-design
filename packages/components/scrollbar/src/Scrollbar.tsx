import * as React from 'react';
import Icon, { SpinnerM } from '@synerise/ds-icon';
import * as S from './Scrollbar.styles';
import { ScrollbarProps } from './Scrollbar.types';
import { DnDScrollbar } from './DnDScrollbar';
import { VirtualScrollbar } from './VirtualScrollbar';

const Scrollbar = React.forwardRef<HTMLElement, ScrollbarProps>(
  ({ children, loading, withDnD, fetchData, ...props }, forwardedRef) => {
    const Component = withDnD ? DnDScrollbar : VirtualScrollbar;

    const renderScrollbar = React.useMemo(() => {
      return (
        <Component {...props} fetchData={fetchData} ref={forwardedRef}>
          {children}
        </Component>
      );
    }, [children, fetchData, forwardedRef, props]);

    return fetchData ? (
      <S.ScrollbarContainer>
        {renderScrollbar}
        {loading && (
          <S.Loader loading={loading}>
            <Icon component={<SpinnerM />} color="#6a7580" />
          </S.Loader>
        )}
      </S.ScrollbarContainer>
    ) : (
      renderScrollbar
    );
  }
);

export default Scrollbar;
