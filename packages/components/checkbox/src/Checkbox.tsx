import React from 'react';

import '@synerise/ds-core/dist/js/style';
import { Description, ErrorText } from '@synerise/ds-typography';

import * as S from './Checkbox.styles';
import { type CheckboxProps } from './Checkbox.types';
import './style/index.less';

class Checkbox extends React.Component<CheckboxProps> {
  static Group = S.AntdCheckbox.Group;

  render(): React.ReactNode {
    const {
      description,
      errorText,
      children,
      withoutPadding,
      hasError,
      ...antdCheckboxProps
    } = this.props;
    return (
      <S.CheckboxWrapper
        className="ds-checkbox"
        withoutPadding={Boolean(withoutPadding)}
      >
        <S.AntdCheckbox
          {...antdCheckboxProps}
          className={hasError || errorText ? 'error' : undefined}
          solo={!children && !errorText && !description}
        >
          {children}
        </S.AntdCheckbox>
        {(errorText || description) && (
          <S.AdditionalData>
            {errorText && <ErrorText>{errorText}</ErrorText>}
            {description && (
              <Description disabled={antdCheckboxProps.disabled}>
                {description}
              </Description>
            )}
          </S.AdditionalData>
        )}
      </S.CheckboxWrapper>
    );
  }
}

export default Checkbox;
