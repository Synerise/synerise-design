import CodeSnippet from './../CodeSnippet';
import * as React from 'react';
import { CodeSnippetType } from '../CodeSnippet.types';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

const INLINE_CODE_EXAMPLE="Some code text";
const SINGLE_CODE_EXAMPLE="Some code text example";
const MULTI_CODE_EXAMPLE="const registerButton = document.getElementById('registerButton'); const emailInput = document.querySekector('.email-input'); registerButton.addEventListener('click',()=>{ alert('Invalid data'); alert(emailInput.value); console.log('Something went wrong');})";
const BTN_TEXT="Show more";

describe('CodeSnippet', () => {
    it('should render CodeSnippet Inline', () => {
        const { getByText } = renderWithProvider(<CodeSnippet children={INLINE_CODE_EXAMPLE} />);
        expect(getByText(INLINE_CODE_EXAMPLE)).toBeTruthy();
    });
  });

describe('CodeSnippet', () => {
    it('should render CodeSnippet SingleBlock', () => {
        const { getByText,getByTestId } = renderWithProvider(<CodeSnippet children={SINGLE_CODE_EXAMPLE} type={CodeSnippetType.SINGLE_LINE} />);
        expect(getByText(SINGLE_CODE_EXAMPLE)).toBeTruthy();
      });
    });
    describe('CodeSnippet', () => {
      it('should render CodeSnippet MultiBlock', () => {
        const { getByText } = renderWithProvider(<CodeSnippet children={MULTI_CODE_EXAMPLE} type={CodeSnippetType.MULTI_LINE} wrap={true} rows={4}/>);
        expect(getByText(MULTI_CODE_EXAMPLE)).toBeTruthy();
    });
  });
  