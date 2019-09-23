import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdSwitch, { SwitchProps } from 'antd/lib/switch';
import * as S from './Switch.styles';

interface Props extends SwitchProps {
  errorText?: string;
  label: string;
  description?: string;
}

export const Switch: React.FC<Props> = ({ errorText, label, description, ...antdSwitchProps }) => (
  <S.SwitchWrapper>
    <AntdSwitch
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...antdSwitchProps}
      className={errorText ? 'error' : ''}
    />
    <S.Texts className="switch-texts">
      <S.Label className="switch-label">{label}</S.Label>
      <S.BelowLabel>
        {errorText && <S.Error>{errorText}</S.Error>}
        {description && <S.Description className="switch-description">{description}</S.Description>}
      </S.BelowLabel>
    </S.Texts>
  </S.SwitchWrapper>
);

export default Switch;
