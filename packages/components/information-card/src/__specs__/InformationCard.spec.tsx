import type { ReactElement } from 'react';

import { renderWithProvider } from '@synerise/ds-core';
import { screen, waitFor, within } from '@testing-library/react';
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
});

