import React, {
  type MutableRefObject,
  type ReactNode,
  useEffect,
  useState,
} from 'react';

import Button from '@synerise/ds-button';
import Icon, { ArrowUpCircleM } from '@synerise/ds-icon';

import * as S from './BackToTopButton.styles';

type BackToTopButtonProps = {
  label?: ReactNode;
  onClick: () => void;
  scrollContainerRef?: MutableRefObject<HTMLDivElement | null>;
  hasData: boolean;
  /** Scroll threshold in px above which the button becomes visible. Should match the sticky-header offset. */
  threshold: number;
};

export const BackToTopButton = ({
  label,
  onClick,
  scrollContainerRef,
  hasData,
  threshold,
}: BackToTopButtonProps) => {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    const el = scrollContainerRef?.current;
    if (!el) {
      return;
    }

    const update = () => setIsPastThreshold(el.scrollTop > threshold);
    update();
    el.addEventListener('scroll', update, { passive: true });
    return () => el.removeEventListener('scroll', update);
  }, [scrollContainerRef, threshold]);

  const isVisible = hasData && isPastThreshold;

  return (
    <S.BackToTopWrapper $visible={isVisible}>
      <Button
        type="custom-color"
        mode="icon-label"
        color="grey"
        data-testid="ds-table-back-to-top-button"
        onClick={onClick}
      >
        <Icon component={<ArrowUpCircleM />} />
        {label}
      </Button>
    </S.BackToTopWrapper>
  );
};
