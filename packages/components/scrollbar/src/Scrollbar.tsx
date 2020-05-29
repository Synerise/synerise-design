import * as React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './style/index.less';
import SpinnerM from '@synerise/ds-icon/dist/icons/SpinnerM';
import Icon from '@synerise/ds-icon';
import * as S from './Scrollbar.styles';

export type ScrollbarProps = {
  children: React.ReactNode | string;
  classes?: string;
  maxHeight?: string | number;
  absolute?: boolean;
  onScroll?: (e: React.UIEvent) => void;
  loading?: boolean;
  hasMore?: boolean;
  fetchData?: () => void;
};

const Scrollbar: React.FC<ScrollbarProps> = ({ loading, hasMore, fetchData,children, classes, maxHeight, absolute = false, onScroll }) => {
  // eslint-disable-next-line no-undef
  const observer = React.useRef(new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting && fetchData) {
        fetchData();
      }
    },
    { threshold: 1 }
    )
  );

  const [element, setElement] = React.useState(null);

  React.useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return (): void => {
      if (currentElement) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return (
    <PerfectScrollbar onScroll={onScroll} options={{ minScrollbarLength: 48 }}>
      <S.ScrollbarContent className={classes} style={{ maxHeight }}>
        <S.ScrollbarWrapper absolute={absolute} loading={loading}>
          {children}
          {!loading && hasMore && (
            <S.LoadTrigger ref={setElement as React.Ref<HTMLSpanElement>} />
          )}
        </S.ScrollbarWrapper>
      </S.ScrollbarContent>
      <S.Loader loading={loading}>
        <Icon component={<SpinnerM />} color="#6a7580" />
      </S.Loader>
    </PerfectScrollbar>
  );
};
export default Scrollbar;
