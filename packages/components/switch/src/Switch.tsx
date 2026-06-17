import classnames from 'classnames';
import React, { forwardRef, useId, useRef } from 'react';

import RawSwitch from './RawSwitch';
import * as S from './Switch.styles';
import { type Props } from './Switch.types';

export { RawSwitch };

export const Switch = forwardRef<HTMLDivElement, Props>(
  (
    {
      errorText,
      label,
      description,
      onChange,
      withFormElementMargin,
      tooltipIcon,
      tooltip,
      className,
      tooltipConfig,
      ...rawSwitchProps
    },
    ref,
  ) => {
    const id = useId();
    const switchElement = useRef<HTMLButtonElement>(null);

    return (
      <S.SwitchWrapper
        ref={ref}
        className={classnames(['ds-switch', className])}
        formElementMargin={Boolean(withFormElementMargin)}
      >
        <S.LabelSwitchWrapper>
          <RawSwitch
            {...rawSwitchProps}
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
              tooltipConfig={tooltipConfig}
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
  },
);

export default Switch;
