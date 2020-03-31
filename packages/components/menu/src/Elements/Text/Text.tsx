import * as React from 'react';
import Icon from '@synerise/ds-icon/';
import AngleRightS from '@synerise/ds-icon/dist/icons/AngleRightS';
import CheckS from '@synerise/ds-icon/dist/icons/CheckS';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './Text.styles';

interface Props {
  parent?: boolean;
  checked?: boolean;
  disabled?: boolean;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  danger?: boolean;
  actions?: React.ReactNode;
  onSelect?: () => void;
  description?: string | React.ReactNode;
}

const Text: React.FC<Props> = ({
  parent,
  checked,
  disabled,
  prefixel,
  suffixel,
  danger,
  children,
  description,
  ...rest
}) => {
  const [pressed, setPressed] = React.useState(false);

  return (
    <S.Wrapper
      onMouseDown={(): void => setPressed(true)}
      onMouseOut={(): void => setPressed(false)}
      onMouseUp={(): void => setPressed(false)}
      onBlur={(): void => setPressed(false)}
      checked={checked}
      pressed={pressed}
      disabled={disabled}
      tabIndex={!disabled ? 0 : undefined}
      danger={danger}
      prefixel={prefixel}
      {...rest}
    >
      <S.Inner prefixel={Boolean(prefixel)}>
        {prefixel && <S.prefixelWrapper disabled={disabled}>{prefixel}</S.prefixelWrapper>}
        <S.ContentWrapper prefixel={Boolean(prefixel)}>
          <S.Content>
            {children}
            {Boolean(description) && <S.Description>{description}</S.Description>}
            {parent && (
              <S.ArrowRight>
                <Icon component={<AngleRightS />} color={theme.palette['grey-600']} />
              </S.ArrowRight>
            )}
            {checked && (
              <S.Checked>
                <Icon component={<CheckS />} color={theme.palette['green-600']} />
              </S.Checked>
            )}
          </S.Content>
          {Boolean(suffixel) && <S.SuffixWraper>{suffixel}</S.SuffixWraper>}
        </S.ContentWrapper>
      </S.Inner>
    </S.Wrapper>
  );
};

export default Text;
