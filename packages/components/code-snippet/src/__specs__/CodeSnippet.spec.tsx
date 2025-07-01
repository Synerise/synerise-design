import React from 'react';

import { renderWithProvider } from '@synerise/ds-utils';

import CodeSnippet from '../CodeSnippet';
import { CodeSnippetType } from '../CodeSnippet.types';

const INLINE_CODE_EXAMPLE = 'Some code text';
const SINGLE_CODE_EXAMPLE = 'Some code text example';
const MULTI_CODE_EXAMPLE =
  "const registerButton = document.getElementById('registerButton'); const emailInput = document.querySekector('.email-input'); registerButton.addEventListener('click',()=>{ alert('Invalid data'); alert(emailInput.value); console.log('Something went wrong');})";

describe('CodeSnippet', () => {
  it('should render CodeSnippet Inline', () => {
    const { getByText } = renderWithProvider(
      <CodeSnippet>{INLINE_CODE_EXAMPLE}</CodeSnippet>,
    );
    expect(getByText(INLINE_CODE_EXAMPLE)).toBeTruthy();
  });

  it('should render CodeSnippet SingleBlock', () => {
    const { getByText } = renderWithProvider(
      <CodeSnippet type={CodeSnippetType.SINGLE_LINE}>
        {SINGLE_CODE_EXAMPLE}
      </CodeSnippet>,
    );
    expect(getByText(SINGLE_CODE_EXAMPLE)).toBeTruthy();
  });

  it('should render CodeSnippet MultiBlock', () => {
    const { getByText } = renderWithProvider(
      <CodeSnippet type={CodeSnippetType.MULTI_LINE} wrap rows={4}>
        {MULTI_CODE_EXAMPLE}
      </CodeSnippet>,
    );
    expect(getByText(MULTI_CODE_EXAMPLE)).toBeTruthy();
  });
});
