import focusWithArrowKeys from '../focusWithArrowKeys';
import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithProvider from '../../testing/renderWithProvider/renderWithProvider';

describe('focusWithArrowKeys', () => {
  const fallback = jest.fn();
  const onFirstElementFocus = jest.fn();
  const onSecondElementFocus = jest.fn();
  const onFirstElementBlur = jest.fn();
  const onSecondElementBlur = jest.fn();
  const onFirstElementClick = jest.fn();
  const onSecondElementClick = jest.fn();
  const wrapperWithSimpleChildren = (
    <div className={'wrapper'} onKeyDown={event => focusWithArrowKeys(event, 'focusable', fallback)}>
      <button
        className="focusable"
        onFocus={onFirstElementFocus}
        onBlur={onFirstElementBlur}
        onClick={onFirstElementClick}
      >
        button 1
      </button>
      <button
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
    <div className={'wrapper'} onKeyDown={event => focusWithArrowKeys(event, 'focusable', fallback)}>
      <div>
        <button
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
    it('should focus on first element on arrow down press', () => {
      // ARRANGE
      const { container } = renderWithProvider(wrapperWithSimpleChildren);
      const wrapper = container.querySelector('.wrapper') as HTMLElement;
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      // ASSERT
      expect(onFirstElementFocus).toBeCalled();
      expect(onSecondElementFocus).toBeCalledTimes(0);
    });
    it('should focus on next sibling when arrowDown pressed', () => {
      // ARRANGE
      const { container } = renderWithProvider(wrapperWithSimpleChildren);
      const wrapper = container.querySelector('.wrapper') as HTMLElement;
      // ACT
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      // ASSERT
      expect(onFirstElementBlur).toBeCalled();
      expect(onSecondElementFocus).toBeCalled();
      expect(onSecondElementBlur).toBeCalledTimes(0);
    });
    it('should execute fallback when there in no next element to focus', () => {
      // ARRANGE
      const { container } = renderWithProvider(wrapperWithSimpleChildren);
      const wrapper = container.querySelector('.wrapper') as HTMLElement;
      // ACT
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      // ASSERT
      expect(fallback).toBeCalled();
    });
    it('should execute fallback when there in no previous element to focus', () => {
      // ARRANGE
      const { container } = renderWithProvider(wrapperWithSimpleChildren);
      const wrapper = container.querySelector('.wrapper') as HTMLElement;
      // ACT
      fireEvent.keyDown(wrapper, { key: 'ArrowUp', code: 'ArrowUp' });
      // ASSERT
      expect(fallback).toBeCalled();
    });
    it('should execute onClick on enter pressed', () => {
      // ARRANGE
      const { container } = renderWithProvider(wrapperWithSimpleChildren);
      const wrapper = container.querySelector('.wrapper') as HTMLElement;
      // ACT
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'Enter', code: 'Enter' });
      // ASSERT
      expect(onFirstElementClick).toBeCalledTimes(0);
      expect(onSecondElementClick).toBeCalled();
    });
  });



  describe('with nested focusable elements', () => {
    it('should focus on first element on arrow down press', () => {
      // ARRANGE
      const { container } = renderWithProvider(wrapperWithNestedChildren);
      const wrapper = container.querySelector('.wrapper') as HTMLElement;
      // ACT
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      // ASSERT
      expect(onFirstElementFocus).toBeCalled();
    });
    it('should focus on next sibling when arrowDown pressed', () => {
      // ARRANGE
      const { container } = renderWithProvider(wrapperWithNestedChildren);
      const wrapper = container.querySelector('.wrapper') as HTMLElement;
      // ACT
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      // ASSERT
      expect(onFirstElementBlur).toBeCalled();
      expect(onSecondElementFocus).toBeCalled();
      expect(onSecondElementBlur).toBeCalledTimes(0);
    });
    it('should execute fallback when there in no next element to focus', () => {
      // ARRANGE
      const { container } = renderWithProvider(wrapperWithNestedChildren);
      const wrapper = container.querySelector('.wrapper') as HTMLElement;
      // ACT
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      // ASSERT
      expect(fallback).toBeCalled();
    });
    it('should execute fallback when there in no previous element to focus', () => {
      // ARRANGE
      const { container } = renderWithProvider(wrapperWithNestedChildren);
      const wrapper = container.querySelector('.wrapper') as HTMLElement;
      // ACT
      fireEvent.keyDown(wrapper, { key: 'ArrowUp', code: 'ArrowUp' });
      // ASSERT
      expect(fallback).toBeCalled();
    });
    it('should execute onClick on enter pressed', () => {
      // ARRANGE
      const { container } = renderWithProvider(wrapperWithNestedChildren);
      const wrapper = container.querySelector('.wrapper') as HTMLElement;
      // ACT
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'ArrowDown', code: 'ArrowDown' });
      fireEvent.keyDown(wrapper, { key: 'Enter', code: 'Enter' });
      // ASSERT
      expect(onFirstElementClick).toBeCalledTimes(0);
      expect(onSecondElementClick).toBeCalled();
    });
  });
});
