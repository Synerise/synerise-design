import React from 'react';
import { screen } from '@testing-library/react';
import { declarationsFor, renderWithProvider } from '@synerise/ds-core/testing';
import SectionMessage from '../SectionMessage';
import { IconOrderWrapper } from '../SectionMessage.styles';

describe('Section message component', () => {

  it('should render with description', () => {
    const description = "Success description";
    renderWithProvider(<SectionMessage type='positive' description={description}/>);

    expect(screen.getByText(description)).toBeTruthy();
  });

  it('should render with showMoreLabel', () => {
    const description = "Success description";
    const showMoreLabel = "Show more";
    const onShowMore = vi.fn();
    renderWithProvider(<SectionMessage type='positive' description={description} showMoreLabel={showMoreLabel} onShowMore={onShowMore}/>);

    expect(screen.getByText(description)).toBeTruthy();
    expect(screen.getByText(showMoreLabel)).toBeTruthy();
  });

  it('turns an icon in IconOrderWrapper brand-blue on hover', () => {
    renderWithProvider(<IconOrderWrapper data-testid="order-icon" />);

    const icon = screen.getByTestId('order-icon');
    expect(declarationsFor(icon, { state: ':hover' })).toContain(
      'color:var(--ds-color-icon-brand-default)',
    );
    expect(declarationsFor(icon)).not.toContain('--ds-color-icon-brand-default');
  });
});
