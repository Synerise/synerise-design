import React from 'react';

import {
  declarationsFor,
  renderWithProvider,
  rulesFor,
} from '@synerise/ds-core/testing';
import Icon from '@synerise/ds-icon';
import { resolveCustomColor } from '@synerise/ds-utils';
import { fireEvent, screen } from '@testing-library/react';

import Tag, { TagShape } from '../index';
import { getColorText } from '../Tag.styles';

describe('Tag', () => {
  const TAGNAME = 'Test';
  const TAG_TESTID = 'tag';
  const REMOVE_BUTTON_TESTID = 'remove-btn';

  const onClick = vi.fn();
  const onRemove = vi.fn();

  it('should render', () => {
    renderWithProvider(<Tag shape={TagShape.DEFAULT_ROUND} name={TAGNAME} />);

    expect(screen.getByText(TAGNAME)).toBeInTheDocument();
  });

  it('should render with remove button', () => {
    renderWithProvider(
      <Tag shape={TagShape.DEFAULT_ROUND} name={TAGNAME} removable />,
    );

    expect(screen.getByTestId(REMOVE_BUTTON_TESTID)).toBeInTheDocument();
  });

  it('should onRemove fire', () => {
    renderWithProvider(
      <Tag
        id="test"
        shape={TagShape.DEFAULT_ROUND}
        name={TAGNAME}
        onRemove={onRemove}
        removable
      />,
    );

    fireEvent.click(screen.getByTestId(REMOVE_BUTTON_TESTID));

    expect(onRemove).toHaveBeenCalled();
  });

  it('should onClick fire', () => {
    renderWithProvider(
      <Tag shape={TagShape.DEFAULT_ROUND} name={TAGNAME} onClick={onClick} />,
    );

    fireEvent.click(screen.getByTestId(TAG_TESTID));

    expect(onClick).toHaveBeenCalled();
  });

  it('should onClick fire if disabled', () => {
    renderWithProvider(
      <Tag
        shape={TagShape.DEFAULT_ROUND}
        name={TAGNAME}
        onClick={onClick}
        disabled
      />,
    );

    fireEvent.click(screen.getByTestId(TAG_TESTID));

    expect(onClick).toHaveBeenCalled();
  });

  it('should className be passed down', () => {
    const TEST_CLASS = 'test-class';
    renderWithProvider(
      <Tag
        shape={TagShape.DEFAULT_ROUND}
        name={TAGNAME}
        className={TEST_CLASS}
      />,
    );

    expect(screen.getByTestId(TAG_TESTID).classList.contains(TEST_CLASS)).toBe(
      true,
    );
  });
});

describe('getColorText', () => {
  it('uses the grey variant text when color is unset, ignoring textColor', () => {
    expect(getColorText()).toBe('var(--ds-tag-variant-gray-text)');
    expect(getColorText(undefined, 'red')).toBe(
      'var(--ds-tag-variant-gray-text)',
    );
  });

  it('uses textColor when color is set', () => {
    expect(getColorText('green', 'red')).toBe('red');
  });

  it('falls back to the colour variant text when only color is set', () => {
    expect(getColorText('green')).toBe('var(--ds-tag-variant-color-text)');
  });

  it('uses muted text on the light-grey custom colour', () => {
    expect(getColorText(resolveCustomColor('grey-200'))).toBe(
      'var(--ds-color-text-base-muted)',
    );
  });

  it('uses muted text on the light-grey hex taken from the theme', () => {
    const lightGrey = '#light-grey';
    const theme = { tokens: { '--ds-color-grey-200': lightGrey } } as never;
    expect(getColorText(lightGrey, undefined, theme)).toBe(
      'var(--ds-color-text-base-muted)',
    );
  });

  it('keeps textColor on the light-grey colour', () => {
    expect(getColorText(resolveCustomColor('grey-200'), 'red')).toBe('red');
  });
});

describe('Tag hover background', () => {
  const hoverDeclarations = (tag: HTMLElement) =>
    declarationsFor(tag, { state: ':hover:before' });

  it('uses the grey variant hover token when color is unset', () => {
    renderWithProvider(<Tag shape={TagShape.DEFAULT_ROUND} name="A" />);

    const declarations = hoverDeclarations(screen.getByTestId('tag'));
    expect(declarations).toContain(
      'background-color:var(--ds-tag-variant-gray-bg-hover)',
    );
    expect(declarations).not.toContain('filter');
  });

  it('keeps the brightness filter when color is set', () => {
    renderWithProvider(
      <Tag shape={TagShape.DEFAULT_ROUND} name="A" color="green" />,
    );

    const declarations = hoverDeclarations(screen.getByTestId('tag'));
    expect(declarations).toContain('filter:brightness(110%)');
    expect(declarations).not.toContain('--ds-tag-variant-gray-bg-hover');
  });

  it('keeps the brightness filter on small pill shapes without color', () => {
    renderWithProvider(<Tag shape={TagShape.SMALL_ROUND} name="A" />);

    const declarations = hoverDeclarations(screen.getByTestId('tag'));
    expect(declarations).toContain('filter:');
    expect(declarations).not.toContain('--ds-tag-variant-gray-bg-hover');
  });
});

describe('Tag remove icon colour', () => {
  it('inherits the tag text colour instead of pinning the colour variant text', () => {
    renderWithProvider(
      <Tag shape={TagShape.DEFAULT_ROUND} name="A" id="a" removable />,
    );

    const button = screen.getByTestId('remove-btn');

    expect(declarationsFor(button)).toContain('color:inherit');
    expect(declarationsFor(button, { state: 'any' })).not.toContain(
      '--ds-tag-variant-color-text',
    );
  });
});

describe('Tag prefix icon colour', () => {
  const renderWithPrefixIcon = (color?: string) => {
    renderWithProvider(
      <Tag
        shape={TagShape.DEFAULT_ROUND}
        name="A"
        id="a"
        removable
        prefixel={
          <Icon component={<svg />} color={color} data-testid="prefix-icon" />
        }
      />,
    );
    fireEvent.mouseOver(screen.getByTestId('remove-btn'));
    const icon = screen.getByTestId('prefix-icon');
    return { icon, wrapper: icon.parentElement as HTMLElement };
  };

  it('turns a default prefix icon red through its container on remove hover', () => {
    const { icon, wrapper } = renderWithPrefixIcon();

    expect(icon?.querySelector('svg')).toHaveStyle('color: inherit');
    expect(declarationsFor(icon, { within: wrapper, state: 'any' })).toContain(
      'color:var(--ds-color-icon-danger-default)',
    );
  });

  it('lets an explicit prefix icon colour win on remove hover', () => {
    const { icon, wrapper } = renderWithPrefixIcon(
      'var(--ds-color-icon-success-default)',
    );

    expect(icon?.querySelector('svg')).toHaveStyle(
      'color: var(--ds-color-icon-success-default)',
    );
    const wrapperSvgColours = rulesFor(icon.querySelector('svg'), {
      within: wrapper,
      state: 'any',
    }).filter(({ declarations }) => /(^|;)(fill|color):/.test(declarations));
    expect(wrapperSvgColours).toEqual([]);
  });
});
