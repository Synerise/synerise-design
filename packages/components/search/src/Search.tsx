import * as React from 'react';
import onClickOutside from 'react-onclickoutside';
import Scrollbar from '@synerise/ds-scrollbar';
import { focusWithArrowKeys } from '@synerise/ds-utils';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

import { hasSomeElement, getAllElementsFiltered, hasSomeElementFiltered } from './Elements/utils/searchUtils';
import * as S from './Search.styles';
import { SearchProps, SearchState, SelectResultDataKeys } from './Search.types';
import { SearchInput } from './Elements';
import SearchItemsContainer from './Elements/SearchItemsContainer/SearchItemsContainer';

const MENU_WIDTH_OFFSET = 17;
const INPUT_EXPAND_ANIMATION_DURATION = 200;
const SCROLLBAR_HEIGHT_OFFSET = 28;

class Search extends React.PureComponent<SearchProps<{}>, SearchState<{}>> {
  private wrapperRef = React.createRef<HTMLDivElement>();
  constructor(props: SearchProps<{}>) {
    super(props);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      isInputOpen: false,
      label: null,
      filteredParameters: props.parameters,
      filteredRecent: props.recent,
      filteredSuggestions: props.suggestions,
      isListVisible: false,
      isResultChosen: false,
      itemsListWidth: 0,
      toggleInputTrigger: false,
      focusInputTrigger: false,
    };
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<SearchProps<{}>>): null {
    const { recent, suggestions, parameters, value, textLookupConfig } = this.props;
    if (prevProps.recent !== recent) {
      this.setState({ filteredRecent: getAllElementsFiltered(recent, value, textLookupConfig.recent) });
    }
    if (prevProps.parameters !== parameters) {
      this.setState({ filteredParameters: getAllElementsFiltered(parameters, value, textLookupConfig.parameters) });
    }
    if (prevProps.suggestions !== suggestions) {
      this.setState({ filteredSuggestions: getAllElementsFiltered(suggestions, value, textLookupConfig.suggestions) });
    }
    return null;
  }

  onKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    const { value, parameterValue, onParameterValueChange, recent, parameters } = this.props;
    const { isInputOpen, filteredRecent, filteredParameters } = this.state;

    if (e.key === 'Backspace' && value === '' && isInputOpen) {
      this.setState({
        label: null,
        filteredRecent: recent,
      });
      onParameterValueChange('');
      return;
    }

    if (e.key === 'Enter' && isInputOpen) {
      const narrowedParameters = filteredParameters && filteredParameters.length;
      const narrowedRecent = filteredRecent && filteredRecent.length;
      if (narrowedParameters === 1 && narrowedRecent === 0 && !parameterValue) {
        this.selectFilter(filteredParameters[0]);
        this.setState({ filteredParameters: parameters });
        return;
      }
      this.setState({ isResultChosen: true });
    }
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

  handleClickOutside = (): void => {
    const { isInputOpen, label, toggleInputTrigger } = this.state;
    const { value } = this.props;
    if (isInputOpen && !value && !label) {
      this.setState({ toggleInputTrigger: !toggleInputTrigger });
    }
    this.setState({ isListVisible: false });
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

  clearValue(): void {
    const { onValueChange, parameters, recent, suggestions, onParameterValueChange } = this.props;
    onValueChange('');
    onParameterValueChange('');

    this.setState({
      label: null,
      filteredRecent: recent,
      filteredParameters: parameters,
      filteredSuggestions: suggestions,
      isResultChosen: false,
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
    });

    onValueChange(item[textLookupConfig[dataKey]]);
  }

  selectFilter(item: object): void {
    const { onValueChange, onParameterValueChange, filterLookupKey, textLookupConfig } = this.props;

    onValueChange('');
    this.setState({ label: item });

    if (filterLookupKey && item[filterLookupKey]) {
      onValueChange(item[textLookupConfig.parameters]);
      onParameterValueChange(item[filterLookupKey]);
      this.setState({ isResultChosen: true });
    } else {
      onParameterValueChange(item[textLookupConfig.parameters]);
    }
  }

  renderRecentItems(): React.ReactNode | false {
    const { recent, recentDisplayProps, value } = this.props;
    const { label, filteredRecent, itemsListWidth } = this.state;

    return (
      recent &&
      recentDisplayProps &&
      !label &&
      filteredRecent &&
      hasSomeElement(filteredRecent) && (
        <SearchItemsContainer
          displayProps={recentDisplayProps}
          onItemClick={
            ((item: object): void => this.selectResult(item, SelectResultDataKeys.RECENT)) as (
              e: MenuItemProps | object
            ) => void
          }
          highlight={value}
          data={filteredRecent}
          width={itemsListWidth}
          listProps={{ autoHeight: true }}
        />
      )
    );
  }

  renderParameters(): React.ReactNode | false {
    const { parameters, parametersDisplayProps, value } = this.props;
    const { label, filteredParameters, itemsListWidth } = this.state;

    return (
      parameters &&
      parametersDisplayProps &&
      !label &&
      filteredParameters &&
      hasSomeElement(filteredParameters) && (
        <SearchItemsContainer
          displayProps={parametersDisplayProps}
          onItemClick={((item: object): void => this.selectFilter(item)) as (e: MenuItemProps | object) => void}
          highlight={value}
          data={filteredParameters}
          width={itemsListWidth}
        />
      )
    );
  }

  renderSuggestions(): React.ReactNode | false {
    const { suggestions, parameterValue, suggestionsDisplayProps, value } = this.props;
    const { isResultChosen, itemsListWidth, filteredSuggestions } = this.state;

    return (
      suggestions &&
      suggestionsDisplayProps &&
      parameterValue &&
      !isResultChosen &&
      filteredSuggestions &&
      hasSomeElement(filteredSuggestions) && (
        <SearchItemsContainer
          displayProps={suggestionsDisplayProps}
          onItemClick={
            ((item: object): void => this.selectResult(item, SelectResultDataKeys.SUGGESTIONS)) as (
              e: MenuItemProps | object
            ) => void
          }
          highlight={value}
          data={filteredSuggestions}
          width={itemsListWidth}
        />
      )
    );
  }

  renderInputWrapper(): React.ReactNode {
    const { placeholder, clearTooltip, value, textLookupConfig, filterLookupKey } = this.props;
    const { label, focusInputTrigger, toggleInputTrigger } = this.state;

    return (
      <SearchInput
        alwaysHighlight
        clearTooltip={clearTooltip}
        filterLookupKey={filterLookupKey}
        textLookupKey={textLookupConfig.parameters}
        filterLabel={label}
        focusTrigger={focusInputTrigger}
        onButtonClick={(): void => {
          this.setState({ focusInputTrigger: !focusInputTrigger });
        }}
        onChange={(newValue: string): void => this.handleChange(newValue)}
        onClear={(): void => this.clearValue()}
        onClick={(): void => this.setState({ isListVisible: true })}
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
      />
    );
  }

  render(): React.ReactElement {
    const { divider, dropdownMaxHeight, width, style } = this.props;
    const {
      isInputOpen,
      label,
      isListVisible,
      focusInputTrigger,
      isResultChosen,
      filteredParameters,
      filteredRecent,
    } = this.state;

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
              className={
                isInputOpen && !isResultChosen && isListVisible && this.isListItemRendered() ? 'search-list-open' : ''
              }
            >
              <Scrollbar absolute maxHeight={dropdownMaxHeight && Number(dropdownMaxHeight - SCROLLBAR_HEIGHT_OFFSET)}>
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
