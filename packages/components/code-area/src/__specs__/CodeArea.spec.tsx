import * as React from 'react';
import CodeArea from '../CodeArea';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

describe('CodeArea', () => {
  it('should render', function() {
    // ARRANGE
    const C = renderWithProvider(
      <CodeArea
        onChange={()=>{}}
        onChangeDebounced={false}
        onChangeDebouncedWait={0}
        label="Label"
        value=''
      />
    );

    // ASSERT
  });

});
