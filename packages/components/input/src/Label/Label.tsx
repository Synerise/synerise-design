import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip';
import Icon from '@synerise/ds-icon';
import InfoFillM from '@synerise/ds-icon/dist/icons/InfoFillM';
import * as S from './Label.styles';

export type LabelProps = {
  id?: string;
  label?: React.ReactNode;
  tooltip?: React.ReactNode;
  style?: object;
  className?: string;
};

const Label: React.FC<LabelProps> = ({ id, className, label, tooltip, style }) => (
  <>
    {label && (
      <S.Label style={style} htmlFor={id} className={className}>
        {label}
        {tooltip && (
          <Tooltip title={tooltip} placement="top" trigger="hover" transitionName="zoom-big-fast">
            <span>
              <Icon size={24} component={<InfoFillM />} />
            </span>
          </Tooltip>
        )}
      </S.Label>
    )}
  </>
);

export default Label;
