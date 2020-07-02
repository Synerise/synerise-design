import * as React from 'react';
import { Close3M } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon from '@synerise/ds-icon';
import { Tooltip } from 'antd';
import * as S from './LargeTrigger.styles';

interface Props {
  value?: any;
  clear: string;
  clearSelection: () => void;
}

const Largerigger: React.FC<Props> = ({ value, clear, clearSelection }) => {
  return (
    <S.LargeTriggerWrapper>
      {value}
      <S.ClearWrapper onClick={clearSelection}>
        <Tooltip title={clear}>
          <Icon component={<Close3M />} color={theme.palette['red-600']} />
        </Tooltip>
      </S.ClearWrapper>
    </S.LargeTriggerWrapper>
  );
};

export default Largerigger;
