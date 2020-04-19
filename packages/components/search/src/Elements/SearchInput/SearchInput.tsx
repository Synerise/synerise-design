import * as React from 'react';
import { ReactElement, useState, useEffect } from 'react';
import { Input } from 'antd';
import Button from '@synerise/ds-button/dist/Button';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import Close3M from '@synerise/ds-icon/dist/icons/Close3M';
import { useOnClickOutside } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon from '@synerise/ds-icon/dist/Icon';
import * as S from '../../Search.styles';
import { FilterElement } from '../../Search.types';
import { SearchInputProps } from './SearchInput.types';

const SearchInput: React.FC<SearchInputProps> = ({
  onClick,
  onToggle,
  onButtonClick,
  placeholder,
  clearTooltip,
  onValueChange,
  value,
  onClear,
  onKeyDown,
  filterLabel,
  closeOnClickOutside,
  focusTrigger,
  toggleTrigger,
}) => {
  const [firstRender, setFirstRender] = useState(true);
  const [inputOpen, setInputOpen] = useState(false);
  const [label, setLabel] = useState<FilterElement | null>();
  const [inputOffset, setInputOffset] = useState(0);
  const [focus, setFocus] = useState(false);
  const [resultChoosed, setResultChoosed] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<Input>(null);

  const toggleOpen = (): void => {
    onToggle && onToggle(!inputOpen);
    setInputOpen(prevState => {
      return !prevState;
    });
  };

  const focusOnInput = (): void => {
    if (!focus && !firstRender) {
      inputRef && inputRef.current && inputRef.current.focus();
    }
  }
  useEffect(() => {
    if (filterLabel === null) {
      setInputOffset(0);
    }
    setLabel(filterLabel);
  }, [filterLabel]);

  useEffect(() => {
    focusOnInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, filterLabel, focusTrigger]);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      toggleOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleTrigger]);

  useOnClickOutside(ref, () => {
    if (closeOnClickOutside && Boolean(!value) && value.length === 0 && label === null) {
      setInputOpen(false);
      setFocus(false);
    }
    setFocus(false);
  });

  const clearValue = React.useCallback((): void => {
    setLabel(null);
    onValueChange('');
    setInputOffset(0);
    onClear('');
    setResultChoosed(false);
    inputRef && inputRef.current && inputRef.current.focus();
  }, [onValueChange, onClear]);

  const change = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const currentValue = e.currentTarget.value;
      onValueChange(currentValue);
      setResultChoosed(false);
    },
    [onValueChange]
  );

  const renderInputWrapper = (): ReactElement => (
    <S.SearchInputWrapper className={inputOpen ? 'is-open' : ''} offset={inputOffset} onClick={onClick}>
      <S.LeftSide isOpen={inputOpen}>
        {label && (
          <S.Filter
            ref={(reference): void => {
              reference && setInputOffset(reference.getBoundingClientRect().width);
            }}
          >
            {label.icon && !resultChoosed && <Icon component={label.icon} />}
            <span>{label.filter ? label.filter : label.text}</span>
          </S.Filter>
        )}
      </S.LeftSide>
      <div className={inputOpen ? 'input-open-wrapper' : ''}>
        <Input
          placeholder={placeholder}
          ref={inputRef}
          value={value}
          onChange={change}
          onKeyDown={onKeyDown}
          onFocus={(): void => setFocus(true)}
        />
      </div>
    </S.SearchInputWrapper>
  );
  return (
    <S.SearchWrapper ref={ref} className="SearchWrapper">
      {renderInputWrapper()}
      <S.SearchButton
        isOpen={inputOpen}
        inputFocused={focus}
        hidden={!!value || !!filterLabel}
        className="SearchButton"
      >
        <Button
          type="ghost"
          onClick={(): void => {
            toggleOpen();
            clearValue();
            onButtonClick && onButtonClick();
            if(inputRef!==null && inputRef.current && inputRef.current !== null && inputRef.current.focus){
              inputRef.current.focus();
            }
          }}
          className={inputOpen ? 'btn-search-open' : 'btn-search'}
          data-testid="btn"
        >
          <Icon component={<SearchM />} />
        </Button>
      </S.SearchButton>
      <S.ClearButton hidden={!value && !filterLabel}>
        <Icon
          onClick={clearValue}
          component={
            <Tooltip title={clearTooltip}>
              <Close3M />
            </Tooltip>
          }
          color={theme.palette['red-600']}
          size={18}
        />
      </S.ClearButton>
    </S.SearchWrapper>
  );
};
export default SearchInput;
