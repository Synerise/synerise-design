/* eslint-disable */
// @ts-nocheck
import React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InformationCard, { InformationCardTooltip } from '../index';
import { NOOP, focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Menu, { MenuItemProps } from '@synerise/ds-menu';
import Button from '@synerise/ds-button';

const sampleTitle = 'Tip title';
const sampleSubtitle = 'some.key';
const sampleDesc = 'sample description';

function testComponentAdapter(renderFunction, options = { usingPortal: false }) {
  const rendered = renderWithProvider(renderFunction(), options.usingPortal ? { container: document.body } : undefined);
  const { container } = rendered;
  return {
    ...rendered,
    // https://github.com/ant-design/ant-design/blob/4.7.3/components/divider/index.tsx#L21-L29
    divider: container.querySelector('.ant-divider-horizontal'),
    infoCard: container.querySelector('.ant-popover-inner-content *[aria-label="information card"]'),
    infoCardPopoverContainer: container
      .querySelector('.ant-popover-inner-content *[aria-label="information card"]')
      ?.closest('.ant-popover'),
    dropdown: container.querySelector('.ant-dropdown'),
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
  };
}

describe('Information card', () => {
  it('should render', () => {
    renderWithProvider(
      <InformationCard
        title={sampleTitle}
        subtitle={sampleSubtitle}
        descriptionConfig={{ value: sampleDesc }}
      />
    );

    expect(screen.getByText(sampleTitle)).toBeTruthy();
    expect(screen.getByText(sampleSubtitle)).toBeTruthy();
    expect(screen.getByText(sampleDesc)).toBeTruthy();
  });
  it.skip('FIXME: default description should be editable', () => {
    const userInput = 'example description provided by the user';
    const onChange = jest.fn(value => value);
    const { container } = renderWithProvider(
      <InformationCard title={sampleTitle} subtitle={sampleSubtitle} descriptionConfig={{ onChange }} />
    );
    const textarea = container.querySelector('textarea');
    fireEvent.focus(textarea);
    
    fireEvent.change(container.querySelector('textarea'), { target: { value: userInput } });
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(userInput);
  });
  it('if children is set to null - do not display description section (also no divider, see `descriptionConfig`)', () => {
    const { container } = renderWithProvider(
      <InformationCard title={sampleTitle} subtitle={sampleSubtitle} descriptionConfig={null} />
    );

    expect(screen.getByText(sampleTitle)).toBeTruthy();
    expect(screen.getByText(sampleSubtitle)).toBeTruthy();
    expect(container.querySelector('.information-card-description')).toBeFalsy();
  });
  it('if description is hidden - divider is hidden', async () => {
    const testCase = testComponentAdapter(() => (
      <InformationCard title={sampleTitle} subtitle={sampleSubtitle} descriptionConfig={null} />
    ));
    const { divider } = testCase;
    expect(divider).toBeFalsy();
  });
  it.skip('FIXME: click on popover does not close dropdown', async () => {
    // FIXME: container detection is not working properly
    const renderInformationCard = () => (
      <InformationCard title={sampleTitle} subtitle={sampleSubtitle} descriptionConfig={sampleDesc} />
    );
    const { infoCard, infoCardPopoverContainer, dropdown, sleep } = testComponentAdapter(() => <WithDropdown />, {
      usingPortal: true,
    });
    expect(dropdown).not.toHaveClass('ant-dropdown-hidden');
    expect(infoCardPopoverContainer).not.toHaveClass('ant-popover-hidden');
    fireEvent.click(infoCard);
    await sleep(100);
    expect(dropdown).not.toHaveClass('ant-dropdown-hidden');
    expect(infoCardPopoverContainer).not.toHaveClass('ant-popover-hidden');
  });
  it.todo('click on the region to the top from arrow does not close dropdown');
  it.todo('removing element containing information card should remove information-card (e.g. esc on modal)');
  it.todo('closing container does not remove clickoutside listener for parent (FIXME)');
  it.todo('InfoCardWrapper span toHaveStyle font-size: 14px');
  it.todo('actionButton can be shown without footer text');
  it.todo('margin between card header and (optional) notice/extra-info should be 8px');
});

describe('Information card tooltip', () => {
  const INFOCARD_PROPS = {
    title: sampleTitle,
    subtitle: sampleSubtitle,
    descriptionConfig: { value: sampleDesc }
  }
  it('Should render infocard as tooltip', () => {
    const TRIGGER = 'trigger';
    renderWithProvider(
      <InformationCardTooltip
        informationCardProps={INFOCARD_PROPS}
      >
        {TRIGGER}
      </InformationCardTooltip>
    );

    expect(screen.getByText(TRIGGER)).toBeInTheDocument();
    expect(screen.queryByText(INFOCARD_PROPS.title)).not.toBeInTheDocument();
    expect(screen.queryByText(INFOCARD_PROPS.subtitle)).not.toBeInTheDocument();
    expect(screen.queryByText(INFOCARD_PROPS.descriptionConfig.value)).not.toBeInTheDocument();
  })
§
  it('Should render infocard as tooltip and show on hover/click', async () => {
    const TRIGGER = 'trigger';
    renderWithProvider(
      <InformationCardTooltip
        informationCardProps={INFOCARD_PROPS}
      >
        {TRIGGER}
      </InformationCardTooltip>
    );
    const trigger = screen.getByText(TRIGGER);
    userEvent.click(trigger);

    await waitFor(() => {
      expect(screen.getByText(INFOCARD_PROPS.title)).toBeInTheDocument();
      expect(screen.getByText(INFOCARD_PROPS.subtitle)).toBeInTheDocument();
      expect(screen.getByText(INFOCARD_PROPS.descriptionConfig.value)).toBeInTheDocument();
    })
  })
});

function WithDropdown(numberOfElements = 1) {
  const [dropdownVisible, setDropdownVisible] = React.useState(true);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(
    ref,
    () => {
      setDropdownVisible(false);
    },
    undefined,
    ['.ignore-click-outside']
  );
  const popoverProps = React.useCallback(
    visible => ({ defaultVisible: dropdownVisible && (visible ?? true) }),
    [dropdownVisible]
  );
  const buildMenuEntry = (visible): Partial<MenuItemProps> => ({
    text: 'Show',
    hoverTooltipProps: popoverProps(visible),
    renderHoverTooltip: () => (
      <InformationCard title="Show" subtitle="someElement.key" descriptionConfig={{ onChange: NOOP }} />
    ),
  });
  return (
    <Dropdown
      overlayStyle={{ borderRadius: '3px' }}
      visible={dropdownVisible}
      placement="bottomLeft"
      overlay={
        <Dropdown.Wrapper
          style={{ width: '220px' }}
          onKeyDown={e => focusWithArrowKeys(e, 'ds-menu-item', () => { })}
          ref={ref}
        >
          <Menu
            dataSource={Array.from(Array(numberOfElements)).map((e, i) => buildMenuEntry(i === 0))}
            asDropdownMenu={true}
            style={{ width: '100%' }}
            showTextTooltip={true}
          />
        </Dropdown.Wrapper>
      }
    >
      <Button onClick={() => setDropdownVisible(!dropdownVisible)} type="primary">
        Dropdown
      </Button>
    </Dropdown>
  );
}
