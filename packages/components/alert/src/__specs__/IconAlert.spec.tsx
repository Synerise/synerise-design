import { renderWithProvider } from '@synerise/ds-utils';
import React from 'react';
import IconAlert from '../IconAlert/IconAlert';
import Icon, { AnonymousM } from '@synerise/ds-icon';

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

  it('Should render custom icon', () => {
    // ARRANGE
    const message = "Custom icon"

    const { getByText, container } = renderWithProvider(
      <IconAlert iconAlert={true} type='warning' message={message} customIcon={<Icon component={<AnonymousM/>} />}/>
    );

    // ASSERT
    expect(container.querySelector('.anonymous-m')).toBeTruthy();
    expect(getByText(message)).toBeTruthy();
  });
})
