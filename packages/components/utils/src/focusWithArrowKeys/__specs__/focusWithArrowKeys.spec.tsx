import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { renderWithProvider } from '@synerise/ds-core';
import focusWithArrowKeys from '../focusWithArrowKeys';

describe('focusWithArrowKeys', () => {
  const fallback = jest.fn();
  const onFirstElementFocus = jest.fn();
  const onSecondElementFocus = jest.fn();
  const onFirstElementBlur = jest.fn();
  const onSecondElementBlur = jest.fn();
  const onFirstElementClick = jest.fn();
  const onSecondElementClick = jest.fn();
  const wrapperWithSimpleChildren = (
    <div data-testid='wrapper' onKeyDown={event => focusWithArrowKeys(event, 'focusable', fallback)}>
      <button
        data-testid="element-1"
        className="focusable"
        onFocus={onFirstElementFocus}
        onBlur={onFirstElementBlur}
        onClick={onFirstElementClick}
      >
        button 1
      </button>
      <button
        data-testid="element-2"
        className="focusable"
        onFocus={onSecondElementFocus}
        onBlur={onSecondElementBlur}
        onClick={onSecondElementClick}
      >
        button 2
      </button>
    </div>
  );
  const wrapperWithNestedChildren = (
    <div data-testid='wrapper' onKeyDown={event => focusWithArrowKeys(event, 'focusable', fallback)}>
      <div>
        <button
          data-testid="element-1"
          className="focusable"
          onFocus={onFirstElementFocus}
          onBlur={onFirstElementBlur}
          onClick={onFirstElementClick}
        >
          button 1
        </button>
      </div>
      <div>
        <div>
          <button
            data-testid="element-2"
            className="focusable"
            onFocus={onSecondElementFocus}
            onBlur={onSecondElementBlur}
            onClick={onSecondElementClick}
          >
            button 2
          </button>
        </div>
      </div>
    </div>
  );

  describe('without nested focusable elements', () => {
    it('should focus on first element on arrow down press', async () => {
      renderWithProvider(wrapperWithSimpleChildren);
      const wrapper = screen.getByTestId('wrapper')
      
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      await waitFor(() => {
        expect(onFirstElementFocus).toBeCalled();
        expect(onSecondElementFocus).toBeCalledTimes(0);
      }, { timeout: 500 })
      
      
    });
    it('should focus on next sibling when arrowDown pressed', async () => {
      renderWithProvider(wrapperWithSimpleChildren);
      const wrapper = screen.getByTestId('wrapper')
      
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      
      await waitFor(() => {
        expect(onFirstElementBlur).toBeCalled();
        expect(onSecondElementFocus).toBeCalled();
        expect(onSecondElementBlur).toBeCalledTimes(0);
      }, {timeout: 500});

    });
    it('should execute fallback when there in no next element to focus', async () => {
      
      renderWithProvider(wrapperWithSimpleChildren);
      const wrapper = screen.getByTestId('wrapper')
      
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      
      await waitFor(() => {
        expect(fallback).toBeCalled();
      }, {timeout: 500});
    });
    it('should execute fallback when there in no previous element to focus', async () => {
      
      renderWithProvider(wrapperWithSimpleChildren);
      const wrapper = screen.getByTestId('wrapper')
      
      fireEvent.keyDown(wrapper, { key: 'ArrowUp', code: 'ArrowUp' });
      
      await waitFor(() => {
        expect(fallback).toBeCalled();
      }, {timeout: 500});
    });
    it('should execute onClick on enter pressed', async () => {
      
      renderWithProvider(wrapperWithSimpleChildren);
      const wrapper = screen.getByTestId('wrapper')
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'Enter', code: 'Enter' });
      
      await waitFor(() => {
        expect(onFirstElementClick).toBeCalledTimes(0);
        expect(onSecondElementClick).toBeCalled();
      }, {timeout: 500});
    });
  });



  describe('with nested focusable elements', () => {
    it('should focus on first element on arrow down press', async () => {
      
      renderWithProvider(wrapperWithNestedChildren);
      const wrapper = screen.getByTestId('wrapper')

      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      
      await waitFor(() => {
        expect(onFirstElementFocus).toBeCalled();
      }, { timeout: 500 })
    });
    it('should focus on next sibling when arrowDown pressed', async () => {
      renderWithProvider(wrapperWithNestedChildren);
      const wrapper = screen.getByTestId('wrapper')

      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });

      await waitFor(() => {
        expect(onFirstElementBlur).toBeCalled();
        expect(onSecondElementFocus).toBeCalled();
        expect(onSecondElementBlur).toBeCalledTimes(0);
      })
    });
    it('should execute fallback when there in no next element to focus', async () => {
      
      renderWithProvider(wrapperWithNestedChildren);
      const wrapper = screen.getByTestId('wrapper')
      
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      
      await waitFor(() => {
        expect(fallback).toBeCalled();
      }, { timeout: 500 })
    });
    it('should execute fallback when there in no previous element to focus', async () => {
      
      renderWithProvider(wrapperWithNestedChildren);
      const wrapper = screen.getByTestId('wrapper')
      
      fireEvent.keyDown(wrapper, { key: 'ArrowUp', code: 'ArrowUp' });
      
      await waitFor(() => {
        expect(fallback).toBeCalled();
      }, { timeout: 500 })
    });
    it('should execute onClick on enter pressed', async () => {
      renderWithProvider(wrapperWithNestedChildren);
      const wrapper = screen.getByTestId('wrapper')
      
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'Enter', code: 'Enter' });
      
      await waitFor(() => {
        expect(onFirstElementClick).toBeCalledTimes(0);
        expect(onSecondElementClick).toBeCalled();
      }, { timeout: 500 })
    });
  });
});
