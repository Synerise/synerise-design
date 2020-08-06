import * as React from 'react';
import classNames from 'classnames';
import { CollectorProps } from './Collector.types';
import * as S from './Collector.styles';

const Collector: React.FC<CollectorProps> = ({ error, className, description, values, label, errorText, disabled }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isFocused, setFocused] = React.useState(false);
  const showError = error || !!errorText;
  const [value, setValue] = React.useState('');

  const onFocusCallback = React.useCallback(() => {
    if (!!inputRef && !!inputRef?.current) {
      inputRef.current.focus();
    }
    setFocused(true);
  }, [inputRef]);

  const onBlurCallback = React.useCallback(() => {
    setFocused(false);
  }, []);

  const [selectedValues, setSelectedValues] = React.useState(values || []);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setSelectedValues([...selectedValues, value]);
      setValue('');
    }
  };

  return (
    <>
      {label && (
        <S.ContentAbove>
          <S.Label>{label}</S.Label>
        </S.ContentAbove>
      )}
      <S.Wrapper
        className={classNames('ds-collector', { [className as string]: !!className })}
        tabIndex={0}
        focus={isFocused}
        onFocus={onFocusCallback}
        error={error}
      >
        <S.MainContent>
          {selectedValues.map((val, index) => (
            <S.CollectorValue
              // eslint-disable-next-line react/no-array-index-key
              key={`${val}-${index}`}
              onRemoveClick={(): void => {
                const filteredValues = selectedValues.filter(v => v !== val);
                setSelectedValues(filteredValues);
              }}
              value={val}
              focused={isFocused}
            />
          ))}
          <S.Input
            onKeyDown={handleKeyDown}
            ref={inputRef}
            value={value}
            onChange={(e): void => setValue(e.target.value)}
            onBlur={onBlurCallback}
          />
        </S.MainContent>
      </S.Wrapper>
      {(showError || description) && (
        <S.ContentBelow>
          {showError && <S.ErrorText>{errorText}</S.ErrorText>}
          {description && <S.Description>{description}</S.Description>}
        </S.ContentBelow>
      )}
    </>
  );
};
export default Collector;
