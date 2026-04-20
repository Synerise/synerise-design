import React, { type MutableRefObject, useRef } from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { act, fireEvent, screen } from '@testing-library/react';

import { BackToTopButton } from '../BackToTopButton';

type HarnessProps = {
  scrollTop?: number;
  threshold: number;
  hasData: boolean;
  label?: string;
  onClick: () => void;
  scrollRefExport?: (ref: MutableRefObject<HTMLDivElement | null>) => void;
};

const Harness = ({
  scrollTop = 0,
  threshold,
  hasData,
  label,
  onClick,
  scrollRefExport,
}: HarnessProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      Object.defineProperty(scrollRef.current, 'scrollTop', {
        value: scrollTop,
        configurable: true,
        writable: true,
      });
    }
    scrollRefExport?.(scrollRef);
  });

  return (
    <div>
      <div
        ref={scrollRef}
        data-testid="scroll-container"
        style={{ overflow: 'auto' }}
      />
      <BackToTopButton
        label={label}
        onClick={onClick}
        scrollContainerRef={scrollRef}
        hasData={hasData}
        threshold={threshold}
      />
    </div>
  );
};

describe('BackToTopButton', () => {
  it('stays hidden while scrollTop is under threshold', () => {
    const onClick = vi.fn();
    renderWithProvider(
      <Harness threshold={200} hasData onClick={onClick} label="Top" />,
    );

    const btn = screen.getByTestId('ds-table-back-to-top-button');
    expect(btn.parentElement).toHaveStyle({ display: 'none' });
  });

  it('becomes visible when scroll passes threshold', () => {
    const onClick = vi.fn();
    let scrollRef: MutableRefObject<HTMLDivElement | null> | null = null;

    renderWithProvider(
      <Harness
        threshold={200}
        hasData
        onClick={onClick}
        label="Top"
        scrollRefExport={(ref) => {
          scrollRef = ref;
        }}
      />,
    );

    expect(scrollRef).not.toBeNull();
    const container = scrollRef!.current!;

    act(() => {
      Object.defineProperty(container, 'scrollTop', {
        value: 500,
        configurable: true,
        writable: true,
      });
      container.dispatchEvent(new Event('scroll'));
    });

    const btn = screen.getByTestId('ds-table-back-to-top-button');
    expect(btn.parentElement).toHaveStyle({ display: 'flex' });
  });

  it('stays hidden past threshold when hasData is false', () => {
    const onClick = vi.fn();
    let scrollRef: MutableRefObject<HTMLDivElement | null> | null = null;

    renderWithProvider(
      <Harness
        threshold={100}
        hasData={false}
        onClick={onClick}
        scrollRefExport={(ref) => {
          scrollRef = ref;
        }}
      />,
    );

    act(() => {
      const container = scrollRef!.current!;
      Object.defineProperty(container, 'scrollTop', {
        value: 9999,
        configurable: true,
        writable: true,
      });
      container.dispatchEvent(new Event('scroll'));
    });

    const btn = screen.getByTestId('ds-table-back-to-top-button');
    expect(btn.parentElement).toHaveStyle({ display: 'none' });
  });

  it('calls onClick when the button is clicked', () => {
    const onClick = vi.fn();
    let scrollRef: MutableRefObject<HTMLDivElement | null> | null = null;

    renderWithProvider(
      <Harness
        threshold={50}
        hasData
        onClick={onClick}
        label="Top"
        scrollRefExport={(ref) => {
          scrollRef = ref;
        }}
      />,
    );

    act(() => {
      const container = scrollRef!.current!;
      Object.defineProperty(container, 'scrollTop', {
        value: 200,
        configurable: true,
        writable: true,
      });
      container.dispatchEvent(new Event('scroll'));
    });

    fireEvent.click(screen.getByTestId('ds-table-back-to-top-button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders the provided label', () => {
    const onClick = vi.fn();
    let scrollRef: MutableRefObject<HTMLDivElement | null> | null = null;

    renderWithProvider(
      <Harness
        threshold={10}
        hasData
        onClick={onClick}
        label="Back to top"
        scrollRefExport={(ref) => {
          scrollRef = ref;
        }}
      />,
    );

    act(() => {
      const container = scrollRef!.current!;
      Object.defineProperty(container, 'scrollTop', {
        value: 100,
        configurable: true,
        writable: true,
      });
      container.dispatchEvent(new Event('scroll'));
    });

    expect(screen.getByText('Back to top')).toBeInTheDocument();
  });
});
