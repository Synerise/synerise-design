import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent } from '@testing-library/react';
import InformationCard from '../index';

const sampleTitle = 'Tip title';
const sampleSubtitle = 'some.key';
const sampleDesc = 'sample description';

describe('Information card', () => {
  it('should render', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <InformationCard title={sampleTitle} subtitle={sampleSubtitle}>{sampleDesc}</InformationCard>
    );

    // ASSERT
    expect(getByText(sampleTitle)).toBeTruthy();
    expect(getByText(sampleSubtitle)).toBeTruthy();
    expect(getByText(sampleDesc)).toBeTruthy();
  });
  it.skip('FIXME default description should be editable', () => {
    const userInput = 'example description provided by the user'
    const onChange = jest.fn(value => value);
    const { container, debug } = renderWithProvider(
      <InformationCard title={sampleTitle} subtitle={sampleSubtitle} descriptionConfig={{onChange}}/>
    );
    const textarea = container.querySelector('textarea')
    fireEvent.focus(textarea);
    debug()
    fireEvent.change(container.querySelector('textarea'), { target: { value: userInput } });
    expect(onChange).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledWith(userInput);
  })
  it.todo('if description is hidden - divier has both top and bottom margin 16px');
  it.todo('click on popoover does not close dropdown');
  it.todo('click on the region to the top from arrow does not close dropdown');
});
