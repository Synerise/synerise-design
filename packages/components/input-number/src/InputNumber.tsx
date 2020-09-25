import * as React from 'react';
import { v4 as uuid } from 'uuid';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import * as S from './InputNumber.styles';
import { Props } from './InputNumber.types';

const InputNumber: React.FC<Props> = ({ label, description, errorText, raw, error, ...antdProps }) => {
  const id = uuid();
  const showError = Boolean(error || errorText);

  return (
    <>
      {label && !raw && (
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
        autoComplete="off"
      />
      {(showError || description) && !raw && (
        <S.ContentBelow>
          {showError && <S.ErrorText>{errorText}</S.ErrorText>}
          {description && <S.Description>{description}</S.Description>}
        </S.ContentBelow>
      )}
    </>
  );
};

export default InputNumber;
