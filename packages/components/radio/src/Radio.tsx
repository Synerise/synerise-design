import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntdRadio, { RadioProps, RadioGroupProps } from 'antd/lib/radio';
import * as S from './Radio.styles';

interface Props extends RadioProps {
  description?: string;
}

const Group: React.FC<RadioGroupProps & { fullWidth?: boolean; big?: boolean }> = ({
  children,
  fullWidth,
  big,
  ...props
}) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <S.AntRadioGroup fullWidth={fullWidth} big={big} {...props}>
      {children}
    </S.AntRadioGroup>
  );
};

class Radio extends React.Component<Props> {
  static Group = Group;
  static Button = AntdRadio.Button;

  render(): React.ReactNode {
    const { description, ...antdRadioButtonProps } = this.props;

    return (
      <S.RadioWrapper>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <AntdRadio {...antdRadioButtonProps} />
        <S.AdditionalData>
          {description && <S.Description disabled={antdRadioButtonProps.disabled}>{description}</S.Description>}
        </S.AdditionalData>
      </S.RadioWrapper>
    );
  }
}

export default Radio;
