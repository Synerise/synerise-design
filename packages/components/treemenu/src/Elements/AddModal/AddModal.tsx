import * as React from 'react';

import Icon from '@synerise/ds-icon';
import Add3M from '@synerise/ds-icon/dist/icons/Add3M';
import Button from '@synerise/ds-button';
import SearchBar from '@synerise/ds-search-bar';
import Loader from '@synerise/ds-loader';
import Scrollbar from '@synerise/ds-scrollbar';
import { SearchM, FileM } from '@synerise/ds-icon/dist/icons';
import { useOnClickOutside, NOOP } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Result from '@synerise/ds-result';

import defaultItemTypes from '../Item/itemTypes';
import { AddModalProps } from './AddModal.types';

import * as S from './AddModal.styles';

const DEFAULT_NAME = '';

const AddModal: React.FC<AddModalProps> = ({
  disabled = false,
  texts,
  children,
  loading = false,
  context,
  onItemAdd = NOOP,
  onVisibleChange = NOOP,
  itemTypes = defaultItemTypes,
  ...restProps
}) => {
  const [search, setSearch] = React.useState(DEFAULT_NAME);
  const [items] = React.useState(itemTypes || []);
  const [overlayVisible, setOverlayVisible] = React.useState<boolean>(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(overlayRef, () => {
    if (overlayVisible) {
      setOverlayVisible(false);
      setSearch(DEFAULT_NAME);
    }
  });

  const handleSearchChange = (name: string): void => setSearch(name);

  const toggleInput = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    event.stopPropagation();
    setSearch(DEFAULT_NAME);
    setOverlayVisible(!overlayVisible);
  };

  const focus = (inputRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>): void => {
    overlayVisible && inputRef.current && inputRef.current.focus();
  };

  const renderItems = (): React.ReactNode => {
    const rendered = Object.keys(items)
      .filter(item => !items[item].hidden)
      .filter(item => {
        return !search ? true : items[item].name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      })
      .map(
        (item: string): React.ReactNode => {
          const thisItem = items[item];
          thisItem.type = item;
          const ThisComponent = thisItem.component || {};
          const ThisIconComponent = ThisComponent.Icon || thisItem.icon || FileM;

          const itemOnClick = (): void => {
            setOverlayVisible(false);
            onItemAdd(thisItem, context);
          };

          return (
            <S.TagItem
              highlight={search}
              key={`${thisItem.key}-${thisItem.name}`}
              prefixel={<Icon component={<ThisIconComponent />} />}
              onClick={itemOnClick}
            >
              {thisItem.name}
            </S.TagItem>
          );
        }
      );

    if (!rendered.length) return <Result description="No results" type="no-results" />;

    return rendered;
  };

  const renderedItems = renderItems();

  const renderedList = loading ? (
    <S.Loader>
      <Loader color="blue" label={texts?.loading} labelPosition="bottom" size="M" />
    </S.Loader>
  ) : (
    <S.TagItems asDropdownMenu>{renderedItems}</S.TagItems>
  );

  const onClearInput = (): void => {
    setSearch(DEFAULT_NAME);
  };

  const handleOnVisibleChange = (visible: boolean): void => {
    onVisibleChange(visible);
    setOverlayVisible(visible);
  };

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => event.stopPropagation();

  return (
    <Dropdown
      overlay={(): React.ReactElement => (
        <Dropdown.Wrapper onClick={onClick} style={{ width: 'auto', minWidth: '200px' }} ref={overlayRef}>
          <SearchBar
            placeholder="Search"
            handleInputRef={focus}
            disabled={loading}
            iconLeft={<Icon component={<SearchM />} />}
            value={search}
            onSearchChange={handleSearchChange}
            clearTooltip={texts?.searchClear || 'Clear'}
            onClearInput={onClearInput}
          />
          <Scrollbar maxHeight={250} absolute>
            {renderedList}
          </Scrollbar>
        </Dropdown.Wrapper>
      )}
      placement="bottomRight"
      trigger={['click']}
      visible={overlayVisible}
      onVisibleChange={handleOnVisibleChange}
      {...restProps}
    >
      {/* eslint-disable-next-line */}
      <div onClick={toggleInput}>
        {children || (
          <Button type="ghost" mode="icon-label" disabled={disabled}>
            <Icon component={<Add3M />} size={24} />
            {texts?.addItemLabel}
          </Button>
        )}
      </div>
    </Dropdown>
  );
};

export default AddModal;
