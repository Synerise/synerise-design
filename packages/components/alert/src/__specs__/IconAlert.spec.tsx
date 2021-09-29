import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import * as React from 'react';
import IconAlert from '../IconAlert/IconAlert';

describe('Alert component', () => {

  it('should render message', () => {
    // ARRANGE
    const message = "Success description";
    const { getByText } = renderWithProvider(<IconAlert type='warning' message={message}/>);

    // ASSERT

    expect(getByText(message)).toBeTruthy();
  });

  it('should render with showMoreLabel', () => {
    // ARRANGE

    const message = "Success description";
    const withLink = "Show more";
    const { getByText } = renderWithProvider(<IconAlert type='warning' message={message}
                                                        withLink={withLink} />);

    // ASSERT
    expect(getByText(message)).toBeTruthy();
    expect(getByText(withLink)).toBeTruthy();
  });
})