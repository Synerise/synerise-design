import React from 'react';

import { getCopyConfig, renderAddon, removeHandlerProps } from '../components/Text/utils';

describe('renderAddon', () => {
  it('should return ReactNode as-is', () => {
    const node = React.createElement('span', null, 'test');
    expect(renderAddon(node, false)).toBe(node);
  });

  it('should call AddonRenderer with hovered state', () => {
    const renderer = vi.fn((hovered: boolean) =>
      React.createElement('span', null, hovered ? 'hovered' : 'default'),
    );
    renderAddon(renderer, true);
    expect(renderer).toHaveBeenCalledWith(true);
  });

  it('should return null for undefined', () => {
    expect(renderAddon(undefined, false)).toBeUndefined();
  });
});

describe('removeHandlerProps', () => {
  it('should remove function props', () => {
    const props = {
      children: 'text',
      disabled: false,
      onClick: vi.fn(),
      onItemHover: vi.fn(),
    } as any;
    const result = removeHandlerProps(props);
    expect(result).toHaveProperty('children', 'text');
    expect(result).toHaveProperty('disabled', false);
    expect(result).not.toHaveProperty('onClick');
    expect(result).not.toHaveProperty('onItemHover');
  });
});

describe('getCopyConfig', () => {
  it('should return disabled config when copyable is false', () => {
    const config = getCopyConfig({ copyable: false, copyValue: 'v' });
    expect(config.enabled).toBeFalsy();
  });

  it('should return enabled config with copyable boolean + copyValue', () => {
    const config = getCopyConfig({ copyable: true, copyValue: 'value' });
    expect(config.enabled).toBeTruthy();
    expect(config.valueToCopy).toBe('value');
  });

  it('should return config from Copyable object', () => {
    const config = getCopyConfig({
      copyable: {
        copyValue: 'obj-value',
        copiedLabel: 'Copied!',
        timeToReset: 2000,
        delayClickEvent: 500,
      },
    });
    expect(config.enabled).toBeTruthy();
    expect(config.valueToCopy).toBe('obj-value');
    expect(config.copiedLabel).toBe('Copied!');
    expect(config.labelTimerReset).toBe(2000);
    expect(config.delayClickEvent).toBe(500);
  });

  it('should not enable when disabled', () => {
    const config = getCopyConfig({
      copyable: true,
      copyValue: 'value',
      disabled: true,
    });
    expect(config.enabled).toBeFalsy();
  });

  it('should use defaults for Copyable without optional fields', () => {
    const config = getCopyConfig({
      copyable: { copyValue: 'v' },
    });
    expect(config.labelTimerReset).toBe(1000);
    expect(config.copiedLabel).toBeUndefined();
  });
});
