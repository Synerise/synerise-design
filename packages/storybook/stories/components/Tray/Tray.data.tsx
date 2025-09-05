import React, { useEffect } from 'react';
import styled from 'styled-components';

import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';
import Icon, { AngleLeftS, AngleRightS } from '@synerise/ds-icon';
import Tray, { useTray } from '@synerise/ds-tray';

import { Placeholder } from '../../constants';

export type TrayStoryType = {
  autoOpen?: boolean;
};

const TrayContentWrapper = styled.div`
  padding: 10px;
  text-align: center;
`;

const TopRightTray = styled(Tray)`
  top: 20px;
  right: 50px;
`;
const TopLeftTray = styled(Tray)`
  top: 20px;
  left: 50px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
`;

const TRAY_DATA = {
  statistics: {
    title: 'Statistics',
    content: (
      <TrayContentWrapper>
        Statistics content
        <Placeholder $height={500} />
      </TrayContentWrapper>
    ),
    footer: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div>Current timezone: UTC</div>
        <Button type="ghost">Edit</Button>
      </div>
    ),
  },
  issues: {
    title: 'Issues',
    content: (
      <TrayContentWrapper>
        Issues content
        <Placeholder $height={200} />
      </TrayContentWrapper>
    ),
    footer: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div>Current timezone: UTC</div>
        <Button type="ghost">Edit</Button>
      </div>
    ),
  },
  capping: {
    title: 'Workflow capping',
    headerRightSide: (
      <>
        <Button type="ghost" mode="icon-label" disabled>
          <Icon component={<AngleLeftS />} /> Next
        </Button>
        <Button type="ghost" mode="label-icon">
          Prev <Icon component={<AngleRightS />} />
        </Button>
      </>
    ),
    content: (
      <TrayContentWrapper>
        Capping content
        <Placeholder $height={200} />
      </TrayContentWrapper>
    ),
  },
};

export const TrayStory = ({ autoOpen }: TrayStoryType) => {
  const { open, close } = useTray();
  const showTray = (trayId, contentId) => {
    open(trayId, TRAY_DATA[contentId]);
  };

  useEffect(() => {
    if (autoOpen) {
      showTray('tray1', 'statistics');
    }
  }, []);

  return (
    <Controls>
      <ButtonGroup compact={false}>
        <Button onClick={() => showTray('tray1', 'statistics')}>
          TRAY 1: Statistics
        </Button>
        <Button onClick={() => showTray('tray1', 'capping')}>
          TRAY 1: Capping
        </Button>
        <Button type="custom-color" color="red" onClick={() => close('tray1')}>
          Hide tray 1
        </Button>
      </ButtonGroup>

      <ButtonGroup compact={false}>
        <Button onClick={() => showTray('tray2', 'issues')}>
          TRAY 2: Issues
        </Button>
        <Button type="custom-color" color="red" onClick={() => close('tray2')}>
          Hide tray 2
        </Button>
      </ButtonGroup>

      <TopLeftTray id="tray1" />
      <TopRightTray id="tray2" />
    </Controls>
  );
};
