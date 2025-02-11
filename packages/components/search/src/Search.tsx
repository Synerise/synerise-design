import React from 'react';
import onClickOutside from 'react-onclickoutside';
import Scrollbar from '@synerise/ds-scrollbar';
import { focusWithArrowKeys } from '@synerise/ds-utils';

import './style/index.less';

import { hasSomeElement, getAllElementsFiltered, hasSomeElementFiltered } from './Elements/utils/searchUtils';
import * as S from './Search.styles';
import { SearchProps, SearchState, SelectResultDataKeys, AnyObject } from './Search.types';
import { SearchHeader, SearchInput, SearchItems } from './Elements';

const MENU_WIDTH_OFFSET = 17;
export const INPUT_EXPAND_ANIMATION_DURATION = 100;
const SCROLLBAR_HEIGHT_OFFSET = 28;
const LIST_HEADER_HEIGHT = 42;

const getParametersScrollTop = ({
  scrollTop,
  rowHeight,
  recent,
}: {
  scrollTop: number;
  rowHeight: number;
  recent: AnyObject[];
}): number => scrollTop - LIST_HEADER_HEIGHT - (hasSomeElement(recent) ? recent.length * rowHeight : 0);

class Search extends React.PureComponent<SearchProps<AnyObject, AnyObject>, SearchState<AnyObject>> {
  private wrapperRef = React.createRef<HTMLDivElement>();

  constructor(props: SearchProps<AnyObject, AnyObject>) {
    super(props);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      isInputOpen: !!props.value || !!props.parameterValue || !!props.alwaysExpanded,
      label: props.parameterValue
        ? props.parameters.find(param => param[props.textLookupConfig.parameters] === props.parameterValue)
        : null,
      filteredParameters: props.parameters,
      filteredRecent: props.recent,
      filteredSuggestions: props.suggestions,
      isListVisible: false,
      isResultChosen: false,
      itemsListWidth: props.width ? props.width - MENU_WIDTH_OFFSET : 0,
      toggleInputTrigger: false,
      focusInputTrigger: false,
      scrollbarScrollTop: 0,
      moveCursorToEnd: true,
    };
  }

  componentDidUpdate(prevProps: SearchProps<AnyObject, AnyObject>): void {
    const { recent, suggestions, parameters, value, textLookupConfig, hideLabel, parameterValue } = this.props;

    if ((prevProps.value !== value && !value) || (prevProps.parameterValue && !parameterValue)) {
      this.handleChange(value);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ isResultChosen: false });
    }

    if (prevProps.recent.length !== recent.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ filteredRecent: getAllElementsFiltered(recent, value, textLookupConfig.recent) });
    }

    if (prevProps.parameters.length !== parameters.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        filteredParameters: parameterValue
          ? parameters
          : getAllElementsFiltered(parameters, value, textLookupConfig.parameters),
      });
    }

    if (suggestions && prevProps.suggestions?.length !== suggestions.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ filteredSuggestions: getAllElementsFiltered(suggestions, value, textLookupConfig.suggestions) });
    }

    if (hideLabel && prevProps.hideLabel !== hideLabel) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        label: null,
        isResultChosen: false,
      });
    }
  }

  onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const { value, onParameterValueChange, recent } = this.props;
    const { isInputOpen } = this.state;

    if (e.key === 'Backspace' && value === '' && isInputOpen) {
      this.setState({
        label: null,
        filteredRecent: recent,
      });
      onParameterValueChange('', null);
      return;
    }

    if (e.key === 'Enter' && isInputOpen) {
      this.setState({ isResultChosen: !!value });
    }
    this.setState({ moveCursorToEnd: false });
  }

  getSearchWrapperWidth(): number {
    const { width } = this.props;
    if (width) {
      return width - MENU_WIDTH_OFFSET;
    }

    if (
      this.wrapperRef !== null &&
      this.wrapperRef.current &&
      this.wrapperRef.current.clientWidth > MENU_WIDTH_OFFSET
    ) {
      return this.wrapperRef.current.clientWidth - MENU_WIDTH_OFFSET;
    }

    return 0;
  }

  // This handler is used for onClickOutside HOC
  handleClickOutside = (): void => {
    const { isInputOpen, label, toggleInputTrigger } = this.state;
    const { value, alwaysExpanded } = this.props;

    if (isInputOpen && !value && !label && !alwaysExpanded) {
      this.setState({ toggleInputTrigger: !toggleInputTrigger });
    }
    this.setState({ isListVisible: false, scrollbarScrollTop: 0 });
  };

  handleClearValue = (): void => {
    const { parameters, recent, suggestions, onClear } = this.props;

    onClear && onClear();
    this.setState({
      label: null,
      filteredRecent: recent,
      filteredParameters: parameters,
      filteredSuggestions: suggestions,
      isResultChosen: false,
    });
  };

  handleChange(currentValue: string): void {
    const { parameterValue, recent, suggestions, parameters, onValueChange, textLookupConfig } = this.props;
    let isAnythingToShow;

    onValueChange(currentValue);

    if (parameterValue) {
      const matchingSuggestions = getAllElementsFiltered(suggestions, currentValue, textLookupConfig.suggestions);
      this.setState({ filteredSuggestions: matchingSuggestions });
      isAnythingToShow = matchingSuggestions.length > 0;
    } else {
      const matchingRecent = getAllElementsFiltered(recent, currentValue, textLookupConfig.recent);
      const matchingParameters = getAllElementsFiltered(parameters, currentValue, textLookupConfig.parameters);
      this.setState({ filteredParameters: matchingParameters, filteredRecent: matchingRecent });
      isAnythingToShow = matchingRecent.length > 0 || matchingParameters.length > 0;
    }

    this.setState({
      isResultChosen: false,
      isListVisible: isAnythingToShow,
    });
  }

  isListItemRendered(): boolean {
    const { suggestions, recent, parameters, value, parameterValue, textLookupConfig } = this.props;
    let isAnythingToShow;

    if (parameterValue) {
      isAnythingToShow = hasSomeElementFiltered(suggestions, value, textLookupConfig.suggestions);
    } else {
      const anyRecentItem = hasSomeElementFiltered(recent, value, textLookupConfig.recent);
      const anyFilter = hasSomeElementFiltered(parameters, value, textLookupConfig.parameters);
      isAnythingToShow = anyFilter || anyRecentItem;
    }

    return isAnythingToShow;
  }

  selectResult(item: object, dataKey: SelectResultDataKeys): void {
    const { onValueChange, textLookupConfig } = this.props;

    this.setState({
      isResultChosen: true,
      moveCursorToEnd: true,
    });

    onValueChange(item[textLookupConfig[dataKey]]);
  }

  selectFilter(item: object): void {
    const { onValueChange, onParameterValueChange, filterLookupKey, textLookupConfig } = this.props;
    const { focusInputTrigger } = this.state;

    onValueChange('');
    this.setState({
      label: item,
      focusInputTrigger: !focusInputTrigger,
      moveCursorToEnd: true,
    });

    if (filterLookupKey && item[filterLookupKey]) {
      onValueChange(item[textLookupConfig.parameters]);

      // @ts-ignore
      onParameterValueChange(item[filterLookupKey], item);
      this.setState({ isResultChosen: true });
    } else {
      // @ts-ignore
      onParameterValueChange(item[textLookupConfig.parameters], item);
    }
  }

  renderRecentItems(): React.ReactNode | false {
    const { recent, recentDisplayProps, value } = this.props;
    const { label, filteredRecent, itemsListWidth } = this.state;
    const { title, tooltip, rowHeight, itemRender } = recentDisplayProps;

    return (
      recent &&
      !label &&
      hasSomeElement(filteredRecent) && (
        <>
          {!!title && <SearchHeader headerText={title} tooltip={tooltip} />}
          <SearchItems
            data={filteredRecent}
            highlight={value}
            itemRender={itemRender}
            onItemClick={(item: AnyObject): void => this.selectResult(item, SelectResultDataKeys.RECENT)}
            rowHeight={rowHeight}
            width={itemsListWidth}
          />
        </>
      )
    );
  }

  renderParameters(): React.ReactNode | false {
    const { parameters, parametersDisplayProps, value, dropdownMaxHeight, recentDisplayProps } = this.props;
    const { label, filteredParameters, itemsListWidth, scrollbarScrollTop, filteredRecent } = this.state;
    const { title, tooltip, rowHeight, itemRender, listProps } = parametersDisplayProps;

    return (
      parameters &&
      !label &&
      hasSomeElement(filteredParameters) && (
        <>
          {!!title && <SearchHeader headerText={title} tooltip={tooltip} />}
          <SearchItems
            data={filteredParameters}
            height={dropdownMaxHeight}
            highlight={value}
            itemRender={itemRender}
            onItemClick={(item: AnyObject): void => this.selectFilter(item)}
            rowHeight={rowHeight}
            width={itemsListWidth}
            listProps={{
              scrollTop: getParametersScrollTop({
                scrollTop: scrollbarScrollTop,
                recent: filteredRecent,
                rowHeight: recentDisplayProps.rowHeight,
              }),
              ...(listProps || {}),
            }}
          />
        </>
      )
    );
  }

  renderSuggestions(): React.ReactNode | false {
    const { suggestions, parameterValue, suggestionsDisplayProps, value, dropdownMaxHeight } = this.props;
    const { isResultChosen, itemsListWidth, filteredSuggestions, scrollbarScrollTop } = this.state;

    return (
      suggestions &&
      suggestionsDisplayProps &&
      parameterValue &&
      !isResultChosen &&
      filteredSuggestions &&
      hasSomeElement(filteredSuggestions) && (
        <>
          {!!suggestionsDisplayProps.title && (
            <SearchHeader headerText={suggestionsDisplayProps.title} tooltip={suggestionsDisplayProps.tooltip} />
          )}
          <SearchItems
            data={filteredSuggestions}
            height={dropdownMaxHeight}
            highlight={value}
            itemRender={suggestionsDisplayProps.itemRender}
            onItemClick={(item: AnyObject): void => this.selectResult(item, SelectResultDataKeys.SUGGESTIONS)}
            rowHeight={suggestionsDisplayProps.rowHeight}
            width={itemsListWidth}
            listProps={{
              scrollTop: scrollbarScrollTop,
              ...(suggestionsDisplayProps.listProps || {}),
            }}
          />
        </>
      )
    );
  }

  renderInputWrapper(): React.ReactNode {
    const {
      placeholder,
      clearTooltip,
      value,
      textLookupConfig,
      filterLookupKey,
      disableInput,
      inputProps,
      alwaysExpanded,
    } = this.props;
    const { label, isListVisible, focusInputTrigger, toggleInputTrigger, moveCursorToEnd } = this.state;

    return (
      <SearchInput
        alwaysHighlight
        clearTooltip={clearTooltip}
        filterLookupKey={filterLookupKey}
        textLookupKey={textLookupConfig.parameters}
        filterLabel={label}
        focusTrigger={focusInputTrigger}
        onButtonClick={(): void => this.setState({ focusInputTrigger: !focusInputTrigger })}
        onChange={(newValue: string): void => this.handleChange(newValue)}
        onClear={this.handleClearValue}
        onClick={(): void => {
          this.setState({ isListVisible: true, itemsListWidth: this.getSearchWrapperWidth() });
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => this.onKeyDown(e)}
        onToggle={(toggle: boolean): void => {
          this.setState({ isListVisible: toggle, isInputOpen: toggle });
          setTimeout(() => {
            this.setState({ itemsListWidth: this.getSearchWrapperWidth() });
          }, INPUT_EXPAND_ANIMATION_DURATION);
        }}
        placeholder={placeholder}
        toggleTrigger={toggleInputTrigger}
        value={value}
        moveCursorToEnd={moveCursorToEnd}
        disableInput={disableInput}
        inputProps={inputProps}
        alwaysExpanded={alwaysExpanded}
        closeOnClickOutside={!alwaysExpanded && !isListVisible && !value && !label}
      />
    );
  }

  render(): React.ReactElement {
    const { divider, dropdownMaxHeight, width, style } = this.props;
    const { isInputOpen, label, isListVisible, focusInputTrigger, isResultChosen, filteredParameters, filteredRecent } =
      this.state;

    return (
      <S.SearchWrapper
        ref={this.wrapperRef}
        className="SearchWrapper"
        inputOpen={isInputOpen}
        width={width}
        onKeyDown={(e): void => {
          focusWithArrowKeys(e, 'ds-search-item', () => {
            this.setState({ focusInputTrigger: !focusInputTrigger });
          });
        }}
        style={style}
      >
        {this.renderInputWrapper()}
        {isListVisible && (
          <S.SearchDropdownWrapper
            onClick={(): void => {
              this.setState({ focusInputTrigger: !focusInputTrigger });
            }}
          >
            <S.SearchDropdownContent
              maxHeight={dropdownMaxHeight}
              className={isInputOpen && !isResultChosen && this.isListItemRendered() ? 'search-list-open' : ''}
            >
              <Scrollbar
                absolute
                maxHeight={dropdownMaxHeight - SCROLLBAR_HEIGHT_OFFSET}
                onScroll={({ currentTarget }: React.SyntheticEvent): void => {
                  this.setState({
                    scrollbarScrollTop: currentTarget.scrollTop,
                  });
                }}
              >
                {this.renderRecentItems()}
                {!!filteredParameters?.length && !!filteredRecent?.length && !label && divider}
                {this.renderParameters()}
                {this.renderSuggestions()}
              </Scrollbar>
            </S.SearchDropdownContent>
          </S.SearchDropdownWrapper>
        )}
      </S.SearchWrapper>
    );
  }
}
export default onClickOutside(Search);
