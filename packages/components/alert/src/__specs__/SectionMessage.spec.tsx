import { renderWithProvider } from '@synerise/ds-utils';
import React from 'react';
import SectionMessage from '../SectionMessage/SectionMessage';

describe('Alert component', () => {

  it('should render with description', () => {
    // ARRANGE
    const description = "Success description";
    const { getByText } = renderWithProvider(<SectionMessage type='positive' description={description}/>);

    // ASSERT

    expect(getByText(description)).toBeTruthy();
  });

  it('should render with showMoreLabel', () => {
    // ARRANGE

    const description = "Success description";
    const showMoreLabel = "Show more";
    const onShowMore = jest.fn();
    const { getByText } = renderWithProvider(<SectionMessage type='positive' description={description}
                                                             showMoreLabel={showMoreLabel} onShowMore={onShowMore}/>);

    // ASSERT
    expect(getByText(description)).toBeTruthy();
    expect(getByText(showMoreLabel)).toBeTruthy();
  });
})
