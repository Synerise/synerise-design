import React from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { fireEvent, screen, within } from '@testing-library/react';

import ListItem from '../ListItem';

describe('ListItem', () => {
  it('should render with children', () => {
    renderWithProvider(<ListItem>Test Item</ListItem>);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('should render with text prop', () => {
    renderWithProvider(<ListItem text="Text Prop" />);
    expect(screen.getByText('Text Prop')).toBeInTheDocument();
  });

  it('should handle click events', () => {
    const handleClick = vi.fn();
    renderWithProvider(
      <ListItem onClick={handleClick}>Clickable Item</ListItem>,
    );
    fireEvent.click(screen.getByText('Clickable Item'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should not fire click when disabled', () => {
    const handleClick = vi.fn();
    renderWithProvider(
      <ListItem onClick={handleClick} disabled>
        Disabled Item
      </ListItem>,
    );
    fireEvent.click(screen.getByText('Disabled Item'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should handle Enter key', () => {
    const handleClick = vi.fn();
    renderWithProvider(
      <ListItem onClick={handleClick}>Keyboard Item</ListItem>,
    );
    fireEvent.keyDown(screen.getByText('Keyboard Item'), { key: 'Enter' });
    expect(handleClick).toHaveBeenCalled();
  });

  it('should not handle Enter key when disabled', () => {
    const handleClick = vi.fn();
    renderWithProvider(
      <ListItem onClick={handleClick} disabled>
        Disabled Keyboard
      </ListItem>,
    );
    fireEvent.keyDown(screen.getByText('Disabled Keyboard'), {
      key: 'Enter',
    });
    expect(handleClick).not.toHaveBeenCalled();
  });

  describe('type variants', () => {
    it('should render danger type', () => {
      renderWithProvider(<ListItem type="danger">Danger Item</ListItem>);
      expect(screen.getByText('Danger Item')).toBeInTheDocument();
    });

    it('should render divider type', () => {
      const { container } = renderWithProvider(<ListItem type="divider" />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('should render header type', () => {
      renderWithProvider(<ListItem type="header">Header</ListItem>);
      expect(screen.getByText('Header')).toBeInTheDocument();
    });

    it('should render select type', () => {
      renderWithProvider(<ListItem type="select">Select Item</ListItem>);
      expect(screen.getByText('Select Item')).toBeInTheDocument();
    });
  });

  describe('prefix and suffix', () => {
    it('should render suffix element', () => {
      renderWithProvider(
        <ListItem suffixel={<span data-testid="custom-suffix">S</span>}>
          With Suffix
        </ListItem>,
      );
      expect(screen.getByTestId('custom-suffix')).toBeInTheDocument();
    });

    it('should render prefix element', () => {
      renderWithProvider(
        <ListItem prefixel={<span data-testid="custom-prefix">P</span>}>
          With Prefix
        </ListItem>,
      );
      expect(screen.getByTestId('custom-prefix')).toBeInTheDocument();
    });

    it('should render suffix via AddonRenderer', () => {
      const suffixRenderer = (hovered: boolean) => (
        <span data-testid="addon-suffix">{hovered ? 'H' : 'D'}</span>
      );
      renderWithProvider(
        <ListItem suffixel={suffixRenderer}>Addon Suffix</ListItem>,
      );
      expect(screen.getByTestId('addon-suffix')).toBeInTheDocument();
    });

    it('should hide suffix when suffixVisibilityTrigger is hover and not hovered', () => {
      renderWithProvider(
        <ListItem
          suffixel={<span>Suffix</span>}
          suffixVisibilityTrigger="hover"
        >
          Hover Suffix
        </ListItem>,
      );
      const suffix = screen.getByTestId('list-item-suffix');
      expect(suffix).not.toBeVisible();
    });

    it('should show suffix on hover when suffixVisibilityTrigger is hover', () => {
      renderWithProvider(
        <ListItem
          suffixel={<span>Suffix</span>}
          suffixVisibilityTrigger="hover"
        >
          Hover Suffix
        </ListItem>,
      );
      const item = screen.getByTestId('ds-list-item');
      fireEvent.mouseOver(item);
      const suffix = screen.getByTestId('list-item-suffix');
      expect(suffix).toBeVisible();
    });
  });

  describe('checked state', () => {
    it('should render check icon when checked', () => {
      renderWithProvider(<ListItem checked>Checked Item</ListItem>);
      expect(screen.getByTestId('list-item-suffix')).toBeInTheDocument();
    });

    it('should add selected class when checked', () => {
      renderWithProvider(<ListItem checked>Checked Item</ListItem>);
      const item = screen.getByTestId('ds-list-item');
      expect(item).toHaveClass('ds-list-item-selected');
    });
  });

  describe('sub-menu', () => {
    it('should expand sub-menu on click', () => {
      const { container } = renderWithProvider(
        <ListItem
          subMenu={[
            { children: 'Sub Item A', itemKey: 'a' },
            { children: 'Sub Item B', itemKey: 'b' },
          ]}
        >
          Parent
        </ListItem>,
      );
      // Sub-menu items are in the DOM but hidden (max-height: 0)
      expect(screen.getByText('Sub Item A')).toBeInTheDocument();
      expect(screen.getByText('Sub Item A').closest('[class*="SubMenuContainer"]')).toHaveStyle('max-height: 0px');

      fireEvent.click(screen.getByText('Parent'));
      expect(screen.getByText('Sub Item A').closest('[class*="SubMenuContainer"]')).toHaveStyle('max-height: 999px');
    });

    it('should collapse sub-menu on second click', () => {
      renderWithProvider(
        <ListItem subMenu={[{ children: 'Sub Item', itemKey: 'a' }]}>
          Parent
        </ListItem>,
      );
      fireEvent.click(screen.getByText('Parent'));
      expect(screen.getByText('Sub Item').closest('[class*="SubMenuContainer"]')).toHaveStyle('max-height: 999px');

      fireEvent.click(screen.getByText('Parent'));
      expect(screen.getByText('Sub Item').closest('[class*="SubMenuContainer"]')).toHaveStyle('max-height: 0px');
    });
  });

  describe('highlight', () => {
    it('should highlight matching text', () => {
      const { container } = renderWithProvider(
        <ListItem highlight="test">This is a test item</ListItem>,
      );
      expect(
        container.querySelector('.ds-list-item-highlight'),
      ).toBeInTheDocument();
    });
  });

  describe('size', () => {
    it('should render description only at large size', () => {
      renderWithProvider(
        <ListItem size="large" description="Description text">
          Large Item
        </ListItem>,
      );
      expect(screen.getByText('Description text')).toBeInTheDocument();
    });

    it('should not render description at default size', () => {
      renderWithProvider(
        <ListItem description="Hidden Description">Default Item</ListItem>,
      );
      expect(screen.queryByText('Hidden Description')).not.toBeInTheDocument();
    });
  });
});
