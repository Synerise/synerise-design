import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithProvider } from '@synerise/ds-utils';
import SectionMessage from '../SectionMessage';

describe('Section message component', () => {

  it('should render with description', () => {
    const description = "Success description";
    renderWithProvider(<SectionMessage type='positive' description={description}/>);

    expect(screen.getByText(description)).toBeTruthy();
  });

  it('should render with showMoreLabel', () => {
    const description = "Success description";
    const showMoreLabel = "Show more";
    const onShowMore = jest.fn();
    renderWithProvider(<SectionMessage type='positive' description={description} showMoreLabel={showMoreLabel} onShowMore={onShowMore}/>);

    expect(screen.getByText(description)).toBeTruthy();
    expect(screen.getByText(showMoreLabel)).toBeTruthy();
  });
})
