import type { ReactElement } from 'react';

import { renderWithProvider } from '@synerise/ds-core/testing';
import {
  act,
  fireEvent,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InformationCard, { InformationCardTooltip } from '../index';

const sampleTitle = 'Tip title';
const sampleSubtitle = 'some.key';
const sampleDesc = 'sample description';

function testComponentAdapter(renderFunction: () => ReactElement) {
  const rendered = renderWithProvider(renderFunction());
  return {
    ...rendered,
    divider: screen.queryByRole('separator'),
  };
}

describe('Information card', () => {
  it('should render', () => {
    renderWithProvider(
      <InformationCard
        title={sampleTitle}
        subtitle={sampleSubtitle}
        descriptionConfig={{ value: sampleDesc }}
      />,
    );

    expect(screen.getByText(sampleTitle)).toBeTruthy();
    expect(screen.getByText(sampleSubtitle)).toBeTruthy();
    expect(screen.getByText(sampleDesc)).toBeTruthy();
  });
  it('if children is set to null - do not display description section (also no divider, see `descriptionConfig`)', () => {
    const { container } = renderWithProvider(
      <InformationCard
        title={sampleTitle}
        subtitle={sampleSubtitle}
        descriptionConfig={null}
      />,
    );

    expect(screen.getByText(sampleTitle)).toBeTruthy();
    expect(screen.getByText(sampleSubtitle)).toBeTruthy();
    expect(
      container.querySelector('.information-card-description'),
    ).toBeFalsy();
  });
  it('if description is hidden - divider is hidden', async () => {
    const testCase = testComponentAdapter(() => (
      <InformationCard
        title={sampleTitle}
        subtitle={sampleSubtitle}
        descriptionConfig={null}
      />
    ));
    const { divider } = testCase;
    expect(divider).toBeFalsy();
  });
  it('renders actionButton even without footerText', () => {
    renderWithProvider(
      <InformationCard
        title={sampleTitle}
        subtitle={sampleSubtitle}
        descriptionConfig={null}
        actionButton
        actionButtonTooltipText="Open"
      />,
    );

    const footer = screen.getByTestId('information-card-footer');
    expect(footer).toBeInTheDocument();
    expect(within(footer).getByRole('button')).toBeInTheDocument();
  });

  describe('loading state', () => {
    it('renders skeleton placeholders and sets aria-busy when isLoading', () => {
      renderWithProvider(<InformationCard isLoading />);

      const wrapper = screen.getByLabelText('information card');
      expect(wrapper).toHaveAttribute('aria-busy');
      expect(
        screen.getByTestId('information-card-loading'),
      ).toBeInTheDocument();
    });

    it('hides footer band when no footer props are present', () => {
      renderWithProvider(<InformationCard isLoading />);

      expect(
        screen.queryByTestId('information-card-loading-footer'),
      ).not.toBeInTheDocument();
    });

    it('renders footer band when a footer prop is provided', () => {
      renderWithProvider(<InformationCard isLoading footerText="loading…" />);

      expect(
        screen.getByTestId('information-card-loading-footer'),
      ).toBeInTheDocument();
    });

    it('ignores content props in loading mode', () => {
      renderWithProvider(
        <InformationCard isLoading title={sampleTitle} subtitle={sampleSubtitle} />,
      );

      expect(screen.queryByText(sampleTitle)).not.toBeInTheDocument();
      expect(screen.queryByText(sampleSubtitle)).not.toBeInTheDocument();
    });
  });
});

describe('Information card tooltip', () => {
  const INFOCARD_PROPS = {
    title: sampleTitle,
    subtitle: sampleSubtitle,
    descriptionConfig: { value: sampleDesc },
  };
  it('Should render infocard as tooltip', () => {
    const TRIGGER = 'trigger';
    renderWithProvider(
      <InformationCardTooltip informationCardProps={INFOCARD_PROPS}>
        {TRIGGER}
      </InformationCardTooltip>,
    );

    expect(screen.getByText(TRIGGER)).toBeInTheDocument();
    expect(screen.queryByText(INFOCARD_PROPS.title)).not.toBeInTheDocument();
    expect(screen.queryByText(INFOCARD_PROPS.subtitle)).not.toBeInTheDocument();
    expect(
      screen.queryByText(INFOCARD_PROPS.descriptionConfig.value),
    ).not.toBeInTheDocument();
  });

  it('Should render infocard as tooltip and show on hover/click', async () => {
    const TRIGGER = 'trigger';
    renderWithProvider(
      <InformationCardTooltip informationCardProps={INFOCARD_PROPS}>
        {TRIGGER}
      </InformationCardTooltip>,
    );
    const trigger = screen.getByText(TRIGGER);
    userEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText(INFOCARD_PROPS.title)).toBeInTheDocument();
      expect(screen.getByText(INFOCARD_PROPS.subtitle)).toBeInTheDocument();
      expect(
        screen.getByText(INFOCARD_PROPS.descriptionConfig.value),
      ).toBeInTheDocument();
    });
  });

  describe('disabled', () => {
    const TRIGGER = 'trigger';
    const PAST_OPEN_DELAY_MS = 300;
    const waitPastOpenDelay = () =>
      act(() => new Promise((resolve) => setTimeout(resolve, PAST_OPEN_DELAY_MS)));
    const renderTooltip = (disabled: boolean) => (
      <InformationCardTooltip
        informationCardProps={INFOCARD_PROPS}
        disabled={disabled}
      >
        {TRIGGER}
      </InformationCardTooltip>
    );

    it('closes an open card and keeps the trigger node when it turns disabled', async () => {
      const { rerender } = renderWithProvider(renderTooltip(false));
      const trigger = screen.getByText(TRIGGER);
      fireEvent.mouseEnter(trigger);
      await screen.findByText(INFOCARD_PROPS.title);

      rerender(renderTooltip(true));

      await waitFor(() => {
        expect(
          screen.queryByText(INFOCARD_PROPS.title),
        ).not.toBeInTheDocument();
      });
      expect(screen.getByText(TRIGGER)).toBe(trigger);
    });

    it('does not open on hover while disabled', async () => {
      renderWithProvider(renderTooltip(true));
      const trigger = screen.getByText(TRIGGER);
      fireEvent.mouseEnter(trigger);
      fireEvent.mouseMove(trigger);

      await waitPastOpenDelay();

      expect(screen.queryByText(INFOCARD_PROPS.title)).not.toBeInTheDocument();
    });

    it('drops a hover-open that is still pending when it turns disabled', async () => {
      const { rerender } = renderWithProvider(renderTooltip(false));
      fireEvent.mouseEnter(screen.getByText(TRIGGER));

      rerender(renderTooltip(true));
      await waitPastOpenDelay();

      expect(screen.queryByText(INFOCARD_PROPS.title)).not.toBeInTheDocument();
    });

    it('opens on hover again once re-enabled', async () => {
      const { rerender } = renderWithProvider(renderTooltip(true));
      rerender(renderTooltip(false));

      fireEvent.mouseEnter(screen.getByText(TRIGGER));

      expect(
        await screen.findByText(INFOCARD_PROPS.title),
      ).toBeInTheDocument();
    });
  });
});

describe('Information card lists', () => {
  it('should not remount property list and summary rows when the parent re-renders', () => {
    // Inline arrays on purpose: a parent re-render hands down new `items` identities.
    const renderCard = () => (
      <InformationCard
        title={sampleTitle}
        subtitle={sampleSubtitle}
        propertyListItems={[
          { label: 'Property', value: 'Property value' },
          { type: 'divider' },
        ]}
        summaryItems={[
          { label: 'Summary label', icon: null },
          { label: 'Tooltip label', icon: null, tooltip: 'Tooltip' },
        ]}
      />
    );
    const { rerender } = renderWithProvider(renderCard());
    const rows = ['Property value', 'Summary label', 'Tooltip label'].map(
      (text) => screen.getByText(text),
    );
    const divider = within(
      screen.getByTestId('information-card-property-list'),
    ).getByRole('separator');

    rerender(renderCard());

    ['Property value', 'Summary label', 'Tooltip label'].forEach(
      (text, index) => {
        expect(screen.getByText(text)).toBe(rows[index]);
      },
    );
    expect(
      within(screen.getByTestId('information-card-property-list')).getByRole(
        'separator',
      ),
    ).toBe(divider);
  });
});
