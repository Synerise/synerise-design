import * as React from 'react';
import { focusWithArrowKeys } from '@synerise/ds-utils';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import onClickOutside from 'react-onclickoutside';
import Scrollbar from '@synerise/ds-scrollbar';
import { hasSomeElement, getAllElementsFiltered, hasSomeElementFiltered } from './Elements/utils/searchUtils';
import * as S from './Search.styles';
import { FilterElement, SearchProps, SearchState } from './Search.types';
import { SearchInput } from './Elements';
import SearchItemsContainer from './Elements/SearchItemsContainer/SearchItemsContainer';

const MENU_WIDTH_OFFSET = 17;
const INPUT_EXPAND_ANIMATION_DURATION = 200;
const SCROLLBAR_HEIGHT_OFFSET = 28;

class Search extends React.PureComponent<SearchProps, SearchState> {
  private wrapperRef = React.createRef<HTMLDivElement>();
  constructor(props: SearchProps) {
    super(props);
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      isInputOpen: false,
      label: null,
      filteredParameters: props.parameters,
      filteredRecent: props.recent,
      filteredSuggestions: props.suggestions,
      isListVisible: false,
      isResultChoosed: false,
      itemsListWidth: 0,
      toggleInputTrigger: false,
      focusInputTrigger: false,
    };
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<SearchProps>): null {
    const { recent, suggestions, parameters, value } = this.props;
    if (prevProps.recent !== recent) {
      this.setState({ filteredRecent: getAllElementsFiltered(recent, value) });
    }
    if (prevProps.parameters !== parameters) {
      this.setState({ filteredParameters: getAllElementsFiltered(parameters, value) });
    }
    if (prevProps.suggestions !== suggestions) {
      this.setState({ filteredSuggestions: getAllElementsFiltered(suggestions, value) });
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
      this.setState({ isResultChoosed: true });
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

  handleChange(value: string): void {
    const { parameterValue, recent, suggestions, parameters, onValueChange } = this.props;
    const currentValue = value;
    onValueChange(currentValue);
    let isAnythingToShow;
    if (parameterValue) {
      const matchingSuggestions = getAllElementsFiltered(suggestions, currentValue);
      this.setState({ filteredSuggestions: matchingSuggestions });
      isAnythingToShow = matchingSuggestions.length > 0;
    } else {
      const matchingRecent = getAllElementsFiltered(recent, currentValue);
      const matchingParameters = getAllElementsFiltered(parameters, currentValue);
      this.setState({ filteredParameters: matchingParameters, filteredRecent: matchingRecent });
      isAnythingToShow = matchingRecent.length > 0 || matchingParameters.length > 0;
    }
    this.setState({
      isResultChoosed: false,
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
      isResultChoosed: false,
    });
  }

  isListItemRendered(): boolean {
    const { suggestions, recent, parameters, value, parameterValue } = this.props;
    let isAnythingToShow;
    if (parameterValue) {
      isAnythingToShow = hasSomeElementFiltered(suggestions, value);
    } else {
      const anyRecentItem = hasSomeElementFiltered(recent, value);
      const anyFilter = hasSomeElementFiltered(parameters, value);
      isAnythingToShow = anyFilter || anyRecentItem;
    }
    return isAnythingToShow;
  }

  selectResult(item: FilterElement): void {
    const { onValueChange } = this.props;
    this.setState({
      isResultChoosed: true,
    });
    onValueChange(item.text);
  }

  selectFilter(item: FilterElement): void {
    const { onValueChange, onParameterValueChange } = this.props;
    onValueChange('');
    this.setState({ label: item });
    if (item.filter) {
      onValueChange(item.text);
      onParameterValueChange(item.filter);
      this.setState({ isResultChoosed: true });
    } else {
      onParameterValueChange(item.text);
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
            ((item: FilterElement): void => this.selectResult(item)) as (e: MenuItemProps | FilterElement) => void
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
          onItemClick={
            ((item: FilterElement): void => this.selectFilter(item)) as (e: MenuItemProps | FilterElement) => void
          }
          highlight={value}
          data={filteredParameters}
          width={itemsListWidth}
          listProps={{ autoHeight: true }}
        />
      )
    );
  }

  renderSuggestions(): React.ReactNode | false {
    const { suggestions, parameterValue, suggestionsDisplayProps, value } = this.props;
    const { isResultChoosed, itemsListWidth, filteredSuggestions } = this.state;
    return (
      suggestions &&
      suggestionsDisplayProps &&
      parameterValue &&
      !isResultChoosed &&
      filteredSuggestions &&
      hasSomeElement(filteredSuggestions) && (
        <SearchItemsContainer
          displayProps={suggestionsDisplayProps}
          onItemClick={
            ((item: FilterElement): void => this.selectResult(item)) as (e: MenuItemProps | FilterElement) => void
          }
          highlight={value}
          data={filteredSuggestions}
          width={itemsListWidth}
        />
      )
    );
  }

  renderInputWrapper(): React.ReactNode {
    const { placeholder, clearTooltip, value } = this.props;
    const { label, focusInputTrigger, toggleInputTrigger } = this.state;
    return (
      <SearchInput
        onClick={(): void => this.setState({ isListVisible: true })}
        onButtonClick={(): void => {
          this.setState({ focusInputTrigger: !focusInputTrigger });
        }}
        placeholder={placeholder}
        clearTooltip={clearTooltip}
        onChange={(val: string): void => this.handleChange(val)}
        value={value}
        onClear={(): void => this.clearValue()}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => this.onKeyDown(e)}
        closeOnClickOutside={false}
        filterLabel={label}
        focusTrigger={focusInputTrigger}
        onToggle={(toggle: boolean): void => {
          this.setState({ isListVisible: toggle, isInputOpen: toggle });
          setTimeout(() => {
            this.setState({ itemsListWidth: this.getSearchWrapperWidth() });
          }, INPUT_EXPAND_ANIMATION_DURATION);
        }}
        toggleTrigger={toggleInputTrigger}
        alwaysHighlight
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
      isResultChoosed,
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
                isInputOpen && !isResultChoosed && isListVisible && this.isListItemRendered() ? 'search-list-open' : ''
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
