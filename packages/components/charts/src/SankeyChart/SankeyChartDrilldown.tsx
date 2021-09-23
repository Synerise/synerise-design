import * as React from 'react';

import Menu from '@synerise/ds-menu';
import { Modal } from './SankeyChart.styles';

const { Item } = Menu;

type Props = {
  visible: boolean;
  setVisible: (flag: boolean) => void;
  eventObj: { clientX: number; clientY: number };
  isDrillDownDisabled: boolean;
  drillDown: JSX.Element;
  isOpenInCRMDisabled: boolean;
  openInCRM: JSX.Element;
};

// eslint-disable-next-line import/prefer-default-export
export const SankeyChartDrilldown: React.FC<Props> = ({
  isDrillDownDisabled,
  drillDown,
  visible,
  setVisible,
  eventObj,
  isOpenInCRMDisabled,
  openInCRM,
}) => {
  return (
    <Modal
      closable={false}
      footer={null}
      maskStyle={{
        backgroundColor: 'transparent',
      }}
      onCancel={(): void => setVisible(false)}
      style={{
        position: 'absolute',
        maxWidth: 230,
        top: eventObj && eventObj.clientY + 100 > window.innerHeight ? eventObj.clientY - 100 : eventObj.clientY,
        left: eventObj && eventObj.clientX + 150 > window.innerWidth ? eventObj.clientX - 150 : eventObj.clientX,
      }}
      visible={visible}
    >
      <Menu>
        {!isOpenInCRMDisabled && <Item key="openInCRM">{openInCRM}</Item>}
        {!isDrillDownDisabled && <Item key="drilldown">{drillDown}</Item>}
      </Menu>
    </Modal>
  );
};
