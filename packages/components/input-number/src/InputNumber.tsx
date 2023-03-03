import * as React from 'react';
import { v4 as uuid } from 'uuid';

import '@synerise/ds-core/dist/js/style';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { InfoFillS } from '@synerise/ds-icon';

import './style/index.less';
import * as S from './InputNumber.styles';
import { Props } from './InputNumber.types';

const InputNumber: React.FC<Props> = ({
  label,
  description,
  errorText,
  raw,
  error,
  prefixel,
  suffixel,
  style,
  tooltip,
  tooltipConfig,
  ...antdProps
}) => {
  const id = React.useMemo(() => uuid(), []);
  const showError = Boolean(error || errorText);

  return (
    <S.InputNumberContainer>
      {label && !raw && (
        <S.ContentAbove>
          <S.Label htmlFor={id}>
            {label}
            {(tooltip || tooltipConfig) && (
              <Tooltip
                title={tooltip}
                placement="top"
                trigger="hover"
                transitionName="zoom-big-fast"
                {...tooltipConfig}
              >
                <span>
                  <Icon size={24} component={<InfoFillS />} />
                </span>
              </Tooltip>
            )}
          </S.Label>
        </S.ContentAbove>
      )}
      <S.InputNumberWrapper prefixel={!!prefixel} suffixel={!!suffixel} style={style}>
        {!!prefixel && <S.Prefixel>{prefixel}</S.Prefixel>}
        <S.AntdInputNumber
          {...antdProps}
          id={id}
          error={showError}
          className={showError ? 'error' : undefined}
          autoComplete="off"
        />
        {!!suffixel && <S.Suffixel>{suffixel}</S.Suffixel>}
      </S.InputNumberWrapper>
      {(showError || description) && !raw && (
        <S.ContentBelow>
          {showError && <S.ErrorText>{errorText}</S.ErrorText>}
          {description && <S.Description>{description}</S.Description>}
        </S.ContentBelow>
      )}
    </S.InputNumberContainer>
  );
};

export default InputNumber;
