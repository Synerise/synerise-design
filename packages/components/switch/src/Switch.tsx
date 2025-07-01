import AntdSwitch from 'antd/lib/switch';
import classnames from 'classnames';
import React, { useId, useRef } from 'react';

import '@synerise/ds-core/dist/js/style';

import * as S from './Switch.styles';
import { type Props } from './Switch.types';
import './style/index.less';

// export RawSwitch from this file to have .less style side effects applied when only RawSwitch is used
export const RawSwitch = AntdSwitch;

export const Switch = ({
  errorText,
  label,
  description,
  onChange,
  withFormElementMargin,
  tooltipIcon,
  tooltip,
  className,
  ...antdSwitchProps
}: Props) => {
  const id = useId();
  const switchElement = useRef<HTMLInputElement>(null);

  return (
    <S.SwitchWrapper
      className={classnames(['ds-switch', className])}
      formElementMargin={Boolean(withFormElementMargin)}
    >
      <S.LabelSwitchWrapper>
        <RawSwitch
          {...antdSwitchProps}
          size="small"
          className={errorText ? 'error' : ''}
          id={id}
          ref={switchElement}
          onChange={(checked, event): void => {
            setTimeout(() => {
              if (switchElement !== null && switchElement.current !== null) {
                switchElement.current.blur();
              }
            }, 300);
            onChange && onChange(checked, event);
          }}
        />

        <S.Texts className="switch-texts">
          <S.Label
            id={id}
            className="switch-label"
            label={label}
            tooltip={tooltip}
          />
        </S.Texts>
      </S.LabelSwitchWrapper>

      {(errorText || description) && (
        <S.DescriptionWrapper>
          <S.Texts className="switch-texts">
            <S.BelowLabel>
              {errorText && <S.Error>{errorText}</S.Error>}
              {description && (
                <S.Description className="switch-description">
                  {description}
                </S.Description>
              )}
            </S.BelowLabel>
          </S.Texts>
        </S.DescriptionWrapper>
      )}
    </S.SwitchWrapper>
  );
};

export default Switch;
