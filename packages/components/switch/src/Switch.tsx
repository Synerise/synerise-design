import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import { v4 as uuid } from 'uuid';
import './style/index.less';
import AntdSwitch, { SwitchProps } from 'antd/lib/switch';
import * as S from './Switch.styles';
import { Props } from './Switch.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ExtendedAntdSwitchComponent = (AntdSwitch as any) as React.ComponentType<
  SwitchProps & { id: string; ref?: React.RefObject<HTMLInputElement> }
>;

export const Switch: React.FC<Props> = ({ errorText, label, description, onChange, ...antdSwitchProps }) => {
  const id = uuid();
  const switchElement = React.useRef<HTMLInputElement>(null);

  return (
    <S.SwitchWrapper className="ds-switch">
      <ExtendedAntdSwitchComponent
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...antdSwitchProps}
        className={errorText ? 'error' : ''}
        id={id}
        ref={switchElement}
        onChange={(checked, event): void => {
          setTimeout(() => {
            if (switchElement !== null && switchElement.current !== null) switchElement.current.blur();
          }, 300);
          onChange && onChange(checked, event);
        }}
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
