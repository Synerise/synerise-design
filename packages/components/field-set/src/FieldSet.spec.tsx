import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import FieldSet from './index';

describe('Field-Set', () => {
  const TITLE = 'Advanced option';
  const DESCRIPTION = 'This section is for avanced users only';

  it('should render', function() {
    renderWithProvider(
      <FieldSet
        title={TITLE}
        description={DESCRIPTION}
      />
    );
    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
  });
  it('should render title', function() {
    renderWithProvider(
      <FieldSet
      title={TITLE}
      description={DESCRIPTION}
      />
    );
    expect(screen.getByText(TITLE)).toBeTruthy();
  });
  it('title should be clickable', function() {
    const onClick = jest.fn();
    renderWithProvider(
      <FieldSet
        onTitleClick={onClick}
        title={TITLE}
        description={DESCRIPTION}
      />
    );
    const titleNode = screen.getByText(TITLE);
    expect(titleNode).toBeTruthy();
    userEvent.click(titleNode);
    expect(onClick).toHaveBeenCalled();
  })

  it('should render expander when expandable', async () => { 
    const TEST_CONTENT = 'TEST_CONTENT';
    renderWithProvider(
      <FieldSet
        expandable
        title={TITLE}
        description={DESCRIPTION}
        component={TEST_CONTENT}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('field-set-collapsible')).toHaveAttribute('aria-hidden', 'true');
    
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByTestId('field-set-collapsible')).toHaveAttribute('aria-hidden', 'false'));
  })

  it('should render expanded by default', async () => {
    const TEST_CONTENT = 'TEST_CONTENT';
    renderWithProvider(
      <FieldSet
        expandable
        defaultExpanded
        title={TITLE}
        description={DESCRIPTION}
        component={TEST_CONTENT}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('field-set-collapsible')).toHaveAttribute('aria-hidden', 'false');
    
    userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(screen.getByTestId('field-set-collapsible')).toHaveAttribute('aria-hidden', 'true'));
  })
});