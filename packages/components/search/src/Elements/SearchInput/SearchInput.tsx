import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import { Input } from 'antd';
import Close3M from '@synerise/ds-icon/dist/icons/Close3M';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon from '@synerise/ds-icon/dist/Icon';

import * as S from '../../Search.styles';
import { SearchInputProps, SearchInputState } from './SearchInput.types';
import SearchButton from '../SearchButton/SearchButton';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};
class SearchInput extends React.Component<SearchInputProps, SearchInputState> {
  private inputRef = React.createRef<Input>();

  constructor(props: SearchInputProps) {
    super(props);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      inputOffset: 0,
      isInputOpen: props.alwaysExpanded || !!props.value,
      isInputFocused: true,
      isResultChosen: false,
    };
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<SearchInputProps>): null {
    const { focusTrigger, toggleTrigger } = this.props;
    if (prevProps.focusTrigger !== focusTrigger) {
      setTimeout(() => {
        this.focusInput();
      }, 0);
    }
    if (prevProps.toggleTrigger !== toggleTrigger) {
      this.toggleOpen();
    }
    return null;
  }

  componentDidUpdate = NOOP;

  focusInput = (): void => {
    this.inputRef.current && this.inputRef.current.focus();
  };

  toggleOpen = (): void => {
    const { onToggle } = this.props;
    const { isInputOpen } = this.state;
    onToggle && onToggle(!isInputOpen);
    this.setState(prevState => ({
      isInputOpen: !prevState.isInputOpen,
    }));
  };

  handleSearchButtonClick = (): void => {
    const { alwaysExpanded, onButtonClick } = this.props;
    if (!alwaysExpanded) {
      this.toggleOpen();
      this.focusInput();
      onButtonClick && onButtonClick();
    }
  };

  handleClearValue = (): void => {
    const { onClear } = this.props;
    this.setState({
      inputOffset: 0,
      isResultChosen: false,
    });
    this.focusInput();
    onClear();
  };

  handleChangeValue = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => {
    const { onChange } = this.props;
    onChange(value);
    this.setState({
      isResultChosen: false,
    });
  };

  handleSearchInputContentClick = (): void => {
    const { onClick } = this.props;
    onClick && onClick();
    this.focusInput();
  };

  handleOffsetWithFilter = (ref: HTMLDivElement | null): void => {
    ref && this.setState({ inputOffset: ref.getBoundingClientRect().width });
  };

  // This handler is used for onClickOutside HOC
  handleClickOutside = (): void => {
    const { closeOnClickOutside, value } = this.props;
    if (closeOnClickOutside && !value) {
      this.setState({
        isInputOpen: false,
      });
    }
  };

  render(): React.ReactElement {
    const {
      alwaysExpanded,
      alwaysHighlight,
      clearTooltip,
      filterLabel,
      filterLookupKey,
      onKeyDown,
      placeholder,
      textLookupKey,
      value,
    } = this.props;
    const { isInputOpen, inputOffset, isResultChosen, isInputFocused } = this.state;

    return (
      <S.SearchInputWrapper>
        <S.SearchInputContent
          className={isInputOpen || !!value || !!filterLabel ? 'is-open search-input-wrapper' : 'search-input-wrapper'}
          offset={inputOffset}
          filterLabel={filterLabel}
          onClick={this.handleSearchInputContentClick}
        >
          <S.LeftSide isOpen={isInputOpen}>
            {filterLabel && (
              <S.Filter ref={this.handleOffsetWithFilter}>
                {filterLabel.icon && !isResultChosen && <Icon component={filterLabel.icon} />}
                <span>{filterLabel[filterLookupKey || ''] || filterLabel[textLookupKey || '']}</span>
              </S.Filter>
            )}
          </S.LeftSide>
          <S.SearchInner hasValue={!!value} alwaysHighlight={alwaysHighlight}>
            <Input
              placeholder={placeholder}
              ref={this.inputRef}
              value={value}
              onChange={this.handleChangeValue}
              onKeyDown={onKeyDown}
              onFocus={(): void => {
                this.setState({ isInputFocused: true });
              }}
              onBlur={(): void => {
                this.setState({ isInputFocused: false });
              }}
              autoFocus
              autoComplete="off"
            />
          </S.SearchInner>
        </S.SearchInputContent>
        <SearchButton
          inputOpen={isInputOpen}
          hidden={!!value || !!filterLabel}
          inputFocused={isInputFocused}
          clickable={!alwaysExpanded}
          onClick={this.handleSearchButtonClick}
        />
        <S.ClearButton hidden={!value && !filterLabel} data-testid="clear">
          <Icon
            onClick={this.handleClearValue}
            component={
              <Tooltip title={clearTooltip}>
                <Close3M />
              </Tooltip>
            }
            color={theme.palette['red-600']}
            size={18}
          />
        </S.ClearButton>
      </S.SearchInputWrapper>
    );
  }
}

export default onClickOutside(SearchInput);
