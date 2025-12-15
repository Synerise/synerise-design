import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen } from '@testing-library/react';

import Estimation from './Estimation';
import type { EstimationProps } from './Estimation.types';

describe('Estimation', () => {
  const defaultProps: EstimationProps = {
    value: '1,234',
    calculatedDate: new Date(),
  };

  it('renders the main value', () => {
    renderWithProvider(<Estimation {...defaultProps} />);
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('renders the label when provided', () => {
    renderWithProvider(<Estimation {...defaultProps} label="Estimation Label" />);
    expect(screen.getByText('Estimation Label')).toBeInTheDocument();
  });

  it('renders total when provided', () => {
    renderWithProvider(<Estimation {...defaultProps} total={5000} />);
    expect(screen.getByText('5000')).toBeInTheDocument();
  });

  it('renders calculated date in footer', () => {
    renderWithProvider(<Estimation {...defaultProps} />);
    expect(screen.getByText(/a few seconds ago/i)).toBeInTheDocument();
  });

  it('renders custom calculated date as ReactNode', () => {
    renderWithProvider(
      <Estimation
        {...defaultProps}
        calculatedDate={<span>Custom Date</span>}
      />
    );
    expect(screen.getByText('Custom Date')).toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    renderWithProvider(
      <Estimation {...defaultProps} errorMessage="Something went wrong" />
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders footer buttons when provided', () => {
    renderWithProvider(
      <Estimation
        {...defaultProps}
        footerButtons={<button>Refresh</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Refresh' })).toBeInTheDocument();
  });

  it('renders progress bar when progressBarValues are provided', () => {
    const progressBarValues = [
      { percent: 30, color: 'red', label: 'Active' },
      { percent: 70, color: 'blue', label: 'Inactive' },
    ];
    renderWithProvider(<Estimation {...defaultProps} progressBarValues={progressBarValues} />);
    expect(screen.getByTestId('estimation-progressbar')).toBeInTheDocument();
  });

  describe('loading states', () => {
    it('renders loading skeleton for value when isLoading is true', () => {
      renderWithProvider(<Estimation {...defaultProps} isLoading />);
      expect(screen.queryByText('1,234')).not.toBeInTheDocument();
    });

    it('renders loading text in footer when isLoading is true', () => {
      renderWithProvider(<Estimation {...defaultProps} isLoading />);
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('renders progress bar skeleton when isLoading.progressBar is true', () => {
      renderWithProvider(
        <Estimation
          {...defaultProps}
          isLoading={{ progressBar: true }}
          progressBarValues={[{ color: 'red', percent: 50 }]}
        />
      );
      expect(screen.getByTestId('estimation-progressbar-skeleton')).toBeInTheDocument();
      expect(screen.queryByTestId('estimation-progressbar')).not.toBeInTheDocument();
    });

    it('renders total skeleton when isLoading.total is true', () => {
      renderWithProvider(
        <Estimation
          {...defaultProps}
          isLoading={{ total: true }}
          total={5000}
        />
      );
      expect(screen.queryByText('5000')).not.toBeInTheDocument();
    });

    it('does not render progress bar when isLoading is true', () => {
      renderWithProvider(
        <Estimation
          {...defaultProps}
          isLoading
          progressBarValues={[{ color: 'red', percent: 50 }]}
        />
      );
      expect(screen.queryByTestId('estimation-progressbar')).not.toBeInTheDocument();
    });
  });

  describe('custom texts', () => {
    it('renders custom calculated text', () => {
      renderWithProvider(
        <Estimation
          {...defaultProps}
          texts={{ calculated: 'Last updated' }}
        />
      );
      expect(screen.getByText('Last updated')).toBeInTheDocument();
    });

    it('renders custom loading text', () => {
      renderWithProvider(
        <Estimation
          {...defaultProps}
          isLoading
          texts={{ loading: 'Calculating...' }}
        />
      );
      expect(screen.getByText('Calculating...')).toBeInTheDocument();
    });
  });

  describe('conditional rendering', () => {
    it('does not render footer when no footerButtons and no calculatedDate', () => {
      const { container } = renderWithProvider(
        <Estimation value="1,234" />
      );
      expect(container.querySelector('[data-testid="estimation-footer"]')).not.toBeInTheDocument();
    });

    it('does not render progress bar when progressBarValues is empty', () => {
      renderWithProvider(<Estimation {...defaultProps} progressBarValues={[]} />);
      expect(screen.queryByTestId('estimation-progressbar')).not.toBeInTheDocument();
    });

    it('does not render total when not provided', () => {
      const { container } = renderWithProvider(<Estimation {...defaultProps} />);
      const rightSide = container.querySelector('[class*="EstimationRightSide"]');
      expect(rightSide).not.toBeInTheDocument();
    });
  });

  describe('HTML attributes', () => {
    it('passes through additional HTML attributes', () => {
      const { container } = renderWithProvider(
        <Estimation
          {...defaultProps}
          data-testid="custom-estimation"
          className="custom-class"
        />
      );
      const wrapper = container.querySelector('[data-testid="custom-estimation"]');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('custom-class');
    });
  });
});
