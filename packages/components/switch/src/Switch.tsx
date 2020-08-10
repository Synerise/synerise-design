import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import { v4 as uuid } from 'uuid';
import './style/index.less';
import AntdSwitch, { SwitchProps } from 'antd/lib/switch';
import * as S from './Switch.styles';

export interface Props extends SwitchProps {
  errorText?: string | React.ReactNode;
  label: string | React.ReactNode;
  description?: string | React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ExtendedAntdSwitchComponent = (AntdSwitch as any) as React.ComponentType<SwitchProps & { id: string }>;

export const Switch: React.FC<Props> = ({ errorText, label, description, ...antdSwitchProps }) => {
  const id = uuid();

  return (
    <S.SwitchWrapper className="ds-switch">
      <ExtendedAntdSwitchComponent
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...antdSwitchProps}
        className={errorText ? 'error' : ''}
        id={id}
      />
      <S.Texts className="switch-texts">
        <S.Label className="switch-label" htmlFor={id}>
          {label}
        </S.Label>
        <S.BelowLabel>
          {errorText && <S.Error>{errorText}</S.Error>}
          {description && <S.Description className="switch-description">{description}</S.Description>}
        </S.BelowLabel>
      </S.Texts>
    </S.SwitchWrapper>
  );
};

export default Switch;
