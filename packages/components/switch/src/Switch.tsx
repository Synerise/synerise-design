import React, { useRef, RefObject, ComponentType } from 'react';
import classnames from 'classnames';
import '@synerise/ds-core/dist/js/style';
import Label from '@synerise/ds-input/dist/Label/Label';
import { v4 as uuid } from 'uuid';
import './style/index.less';
import AntdSwitch, { SwitchProps as AntdSwitchProps } from 'antd/lib/switch';
import * as S from './Switch.styles';
import { Props } from './Switch.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ExtendedAntdSwitchComponent = AntdSwitch as any as ComponentType<
  AntdSwitchProps & { id: string; ref?: RefObject<HTMLInputElement> }
>;

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
  const id = uuid();
  const switchElement = useRef<HTMLInputElement>(null);

  return (
    <S.SwitchWrapper
      className={classnames(['ds-switch', className])}
      formElementMargin={Boolean(withFormElementMargin)}
    >
      <S.LabelSwitchWrapper>
        <ExtendedAntdSwitchComponent
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...antdSwitchProps}
          size="small"
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
          <S.Label className="switch-texts">
            <Label id={id} className="switch-label" label={label} tooltip={tooltip} />
          </S.Label>
        </S.Texts>
      </S.LabelSwitchWrapper>

      {(errorText || description) && (
        <S.DescriptionWrapper>
          <S.Texts className="switch-texts">
            <S.BelowLabel>
              {errorText && <S.Error>{errorText}</S.Error>}
              {description && <S.Description className="switch-description">{description}</S.Description>}
            </S.BelowLabel>
          </S.Texts>
        </S.DescriptionWrapper>
      )}
    </S.SwitchWrapper>
  );
};

export default Switch;
