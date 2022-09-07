import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import Tooltip from '@synerise/ds-tooltip';
import AntdRadio, { RadioGroupProps } from 'antd/lib/radio';
import * as S from './Radio.styles';
import { Props } from './Radio.types';

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
    const { description, title, tooltip, ...antdRadioButtonProps } = this.props;

    return (
      <S.RadioWrapper>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <AntdRadio {...antdRadioButtonProps} />
        <S.RadioTextWrapper>
          {title && (
            <Tooltip align={{ offset: [-16, 0] }} title={tooltip && title}>
              <S.Title disabled={antdRadioButtonProps.disabled}>{title}</S.Title>
            </Tooltip>
          )}
          <S.AdditionalData>
            {description && <S.Description disabled={antdRadioButtonProps.disabled}>{description}</S.Description>}
          </S.AdditionalData>
        </S.RadioTextWrapper>
      </S.RadioWrapper>
    );
  }
}

export default Radio;
