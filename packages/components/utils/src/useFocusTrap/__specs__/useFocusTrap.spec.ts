import { type RefObject } from 'react';
import { renderHook } from '@testing-library/react';

import { useFocusTrap } from '../useFocusTrap';

const createContainer = (...buttons: string[]) => {
  const container = document.createElement('div');
  container.tabIndex = -1;
  buttons.forEach((label) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    container.appendChild(btn);
  });
  document.body.appendChild(container);
  return container;
};

describe('useFocusTrap', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should focus the first focusable element when activated', () => {
    const container = createContainer('First', 'Second');
    const ref = { current: container } as RefObject<HTMLElement>;

    renderHook(() => useFocusTrap(ref, true));

    expect(document.activeElement?.textContent).toBe('First');
  });

  it('should focus the container when no focusable elements exist', () => {
    const container = document.createElement('div');
    container.tabIndex = -1;
    document.body.appendChild(container);
    const ref = { current: container } as RefObject<HTMLElement>;

    renderHook(() => useFocusTrap(ref, true));

    expect(document.activeElement).toBe(container);
  });

  it('should not focus anything when inactive', () => {
    const outside = document.createElement('button');
    outside.textContent = 'Outside';
    document.body.appendChild(outside);
    outside.focus();

    const container = createContainer('Inside');
    const ref = { current: container } as RefObject<HTMLElement>;

    renderHook(() => useFocusTrap(ref, false));

    expect(document.activeElement).toBe(outside);
  });

  it('should wrap focus from last to first on Tab', () => {
    const container = createContainer('First', 'Last');
    const ref = { current: container } as RefObject<HTMLElement>;

    renderHook(() => useFocusTrap(ref, true));

    const lastBtn = container.querySelectorAll('button')[1];
    lastBtn.focus();

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);

    expect(document.activeElement?.textContent).toBe('First');
  });

  it('should wrap focus from first to last on Shift+Tab', () => {
    const container = createContainer('First', 'Last');
    const ref = { current: container } as RefObject<HTMLElement>;

    renderHook(() => useFocusTrap(ref, true));

    const firstBtn = container.querySelectorAll('button')[0];
    firstBtn.focus();

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);

    expect(document.activeElement?.textContent).toBe('Last');
  });

  it('should restore focus to previously focused element on deactivation', () => {
    const outside = document.createElement('button');
    outside.textContent = 'Outside';
    document.body.appendChild(outside);
    outside.focus();

    const container = createContainer('Inside');
    const ref = { current: container } as RefObject<HTMLElement>;

    const { rerender } = renderHook(
      ({ active }) => useFocusTrap(ref, active),
      { initialProps: { active: true } },
    );

    expect(document.activeElement?.textContent).toBe('Inside');

    rerender({ active: false });

    expect(document.activeElement).toBe(outside);
  });

  it('should skip disabled buttons', () => {
    const container = document.createElement('div');
    container.tabIndex = -1;
    const disabledBtn = document.createElement('button');
    disabledBtn.disabled = true;
    disabledBtn.textContent = 'Disabled';
    const enabledBtn = document.createElement('button');
    enabledBtn.textContent = 'Enabled';
    container.appendChild(disabledBtn);
    container.appendChild(enabledBtn);
    document.body.appendChild(container);

    const ref = { current: container } as RefObject<HTMLElement>;

    renderHook(() => useFocusTrap(ref, true));

    expect(document.activeElement?.textContent).toBe('Enabled');
  });
});
