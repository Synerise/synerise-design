import * as React from 'react';

import Icon, { Add3M, SearchM, FileM, PasteClipboardM } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import SearchBar from '@synerise/ds-search-bar';
import Loader from '@synerise/ds-loader';
import Scrollbar from '@synerise/ds-scrollbar';

import { useOnClickOutside, NOOP } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Result from '@synerise/ds-result';

import Tooltip from '@synerise/ds-tooltip';
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
  itemTypes = {},
  hasClipboard,
  onItemPaste,
  ...restProps
}) => {
  const [search, setSearch] = React.useState(DEFAULT_NAME);
  const [items] = React.useState(itemTypes || []);
  const [overlayVisible, setOverlayVisible] = React.useState<boolean>(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const [searchRef, setSearchRef] = React.useState<React.MutableRefObject<HTMLInputElement> | null>(null);

  useOnClickOutside(overlayRef, () => {
    if (overlayVisible) {
      setOverlayVisible(false);
      setSearch(DEFAULT_NAME);
    }
  });

  const handleSearchChange = (name: string): void => setSearch(name);

  const toggleInput = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    event.stopPropagation();
    setSearch(DEFAULT_NAME);
    setOverlayVisible(!overlayVisible);
  };

  const handleInputRef = React.useCallback(ref => {
    setSearchRef(ref);
    ref.current && ref.current.focus();
  }, []);

  React.useEffect(() => {
    if (overlayVisible && searchRef !== null) {
      setTimeout(() => {
        searchRef.current.focus();
      }, 1);
    }
  }, [overlayVisible, searchRef]);

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

    if (!rendered.length) return <Result description={texts.noResults} type="no-results" />;

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

  const handleItemPaste = React.useCallback(
    event => {
      event.stopPropagation();
      onItemPaste && onItemPaste();
    },
    [onItemPaste]
  );

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => event.stopPropagation();

  const renderButton = React.useMemo(() => {
    return !hasClipboard ? (
      <Button type="ghost" mode="icon-label" disabled={disabled}>
        <Icon component={<Add3M />} size={24} />
        {texts?.addItemLabel}
      </Button>
    ) : (
      <S.AddButtonWithPaste>
        <Button type="ghost" mode="icon-label" disabled={disabled}>
          <Icon component={<Add3M />} size={24} />
          {texts?.addItemLabel}
        </Button>
        <Button type="ghost" mode="single-icon" disabled={disabled} onClick={handleItemPaste}>
          <Tooltip title={texts.pasteTooltip}>
            <Icon component={<PasteClipboardM />} />
          </Tooltip>
        </Button>
      </S.AddButtonWithPaste>
    );
  }, [disabled, handleItemPaste, hasClipboard, texts]);

  return (
    <Dropdown
      overlay={(): React.ReactElement => (
        <Dropdown.Wrapper onClick={onClick} style={{ width: 'auto', minWidth: '200px' }} ref={overlayRef}>
          <SearchBar
            placeholder="Search"
            handleInputRef={handleInputRef}
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
      visible={overlayVisible}
      onVisibleChange={handleOnVisibleChange}
      {...restProps}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      <div onClick={toggleInput}>{children || renderButton}</div>
    </Dropdown>
  );
};

export default AddModal;
