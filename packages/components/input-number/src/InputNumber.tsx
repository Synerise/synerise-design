import * as React from 'react';
import { v4 as uuid } from 'uuid';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import { InputNumberProps } from 'antd/lib/input-number';
import * as S from './InputNumber.styles';

interface Props extends InputNumberProps {
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
}

const InputNumber: React.FC<Props> = ({ label, description, errorText, ...antdProps }) => {
  const id = uuid();
  const showError = Boolean(errorText);

  return (
    <>
      {label && (
        <S.ContentAbove>
          <S.Label htmlFor={id}>{label}</S.Label>
        </S.ContentAbove>
      )}
      <S.AntdInputNumber
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...antdProps}
        id={id}
        error={showError}
        className={showError ? 'error' : undefined}
      />
      {(showError || description) && (
        <S.ContentBelow>
          {showError && <S.ErrorText>{errorText}</S.ErrorText>}
          {description && <S.Description>{description}</S.Description>}
        </S.ContentBelow>
      )}
    </>
  );
};

export default InputNumber;
