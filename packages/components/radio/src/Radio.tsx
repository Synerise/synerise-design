import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdRadio, { RadioGroupProps } from 'antd/lib/radio';
import * as S from './Radio.styles';
import { Props } from './Radio.types';

const Group = ({ children, fullWidth, big, ...props }: RadioGroupProps & { fullWidth?: boolean; big?: boolean }) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <S.AntRadioGroup fullWidth={fullWidth} big={big} {...props}>
      {children}
    </S.AntRadioGroup>
  );
};

const RadioComponent = ({ description, ...antdRadioButtonProps }: Props) => {
  return (
    <S.RadioWrapper>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <AntdRadio {...antdRadioButtonProps} />
      <S.AdditionalData>
        {description && <S.Description disabled={antdRadioButtonProps.disabled}>{description}</S.Description>}
      </S.AdditionalData>
    </S.RadioWrapper>
  );
};

const Radio = Object.assign(RadioComponent, { Group, Button: AntdRadio.Button });
export default Radio;
