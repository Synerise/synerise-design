import React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdRadio from 'antd/lib/radio';
import * as S from './Radio.styles';
import { RadioProps, RadioGroupProps } from './Radio.types';

const Group = ({ children, fullWidth, big, ...props }: RadioGroupProps) => {
  return (
    <S.AntRadioGroup fullWidth={fullWidth} big={big} {...props}>
      {children}
    </S.AntRadioGroup>
  );
};

const RadioComponent = ({ description, ...antdRadioButtonProps }: RadioProps) => {
  return (
    <S.RadioWrapper>
      <S.AntRadio {...antdRadioButtonProps} />
      <S.AdditionalData>
        {description && <S.Description disabled={antdRadioButtonProps.disabled}>{description}</S.Description>}
      </S.AdditionalData>
    </S.RadioWrapper>
  );
};

const Radio = Object.assign(RadioComponent, { Group, Button: AntdRadio.Button });
export default Radio;
