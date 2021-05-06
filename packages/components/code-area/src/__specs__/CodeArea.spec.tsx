import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import CodeArea from '../CodeArea';

describe('CodeArea', () => {
  it('should render', function() {
    // ARRANGE
    const { getByText } = renderWithProvider(
      <CodeArea
        onChangeDebounced={false}
        onChangeDebouncedWait={0}
        label="Label"
      />
    );

    // ASSERT
    expect(getByText('Label')).toBeTruthy();
  });

});
