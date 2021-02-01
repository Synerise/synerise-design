import * as React from 'react';

// import { v4 as uuid } from 'uuid';
import Icon from '@synerise/ds-icon';
import Add3M from '@synerise/ds-icon/dist/icons/Add3M';
import Button from '@synerise/ds-button';
import Menu from '@synerise/ds-menu';
import SearchBar from '@synerise/ds-search-bar';
import Checkbox from '@synerise/ds-checkbox';
import CheckboxTristate from '@synerise/ds-checkbox-tristate';
import Loader from '@synerise/ds-loader';
import Tooltip from '@synerise/ds-tooltip';
import { Settings2M, InfoFillS, SearchM } from '@synerise/ds-icon/dist/icons';
import { useOnClickOutside } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Result from '@synerise/ds-result';

// import { validateFolderName } from '../../utils';
import { AddModalProps } from './AddModal.types';
import * as S from './AddModal.styles';
import { TagsListItem } from 'TagsList.types';
import { ClickParam } from 'antd/lib/menu';

const DEFAULT_NAME = '';
const POPUP_CLOSE_DELAY = 0;

type TagInfoProps = {
  info: string;
}

const TagInfo: React.FC<TagInfoProps> = ({info}) => {
  return <Tooltip
    title={info}
  >
    <S.TagInfoIcon component={<InfoFillS />} />
  </Tooltip> 
}

const AddModal: React.FC<AddModalProps> = ({ 
  items = [],
  disabled, 
  texts, 
  tristate = false,
  loading = false,
  trigger,
  searchAddTag = true,
  onManageTags = () => {},
  onItemsAdd = () => {},
  onVisibleChange = () => {}
}) => {
  const CheckboxComponent = tristate ? CheckboxTristate : Checkbox;
  const [search, setSearch] = React.useState(DEFAULT_NAME);
  const [selectedTags, setSelectedTags] = React.useState({});
  const [newTagSelected, setNewTagSelected] = React.useState(false);
  const [overlayVisible, setOverlayVisible] = React.useState<boolean>(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  const selected = Object.keys(selectedTags).length || newTagSelected;

  useOnClickOutside(overlayRef, () => {
    setTimeout(() => {
      if (overlayVisible) {
        setOverlayVisible(false);
      }
    }, POPUP_CLOSE_DELAY);
    setSearch(DEFAULT_NAME);
  });

  const handleSearchChange = React.useCallback((name: string): void => {
    setSearch(name);
  }, []);

  const handleItemsAdd = () => {
    const add = Object.keys(selectedTags).map((id) => {
      const item = {...items.filter(item => item.id === id).shift()} as TagsListItem;
      item.canUpdate = item.canUpdate === undefined ? true : item.canUpdate;
      item.canDelete = item.canDelete === undefined ? true : item.canDelete;
      item.canEnterSettings = item.canEnterSettings === undefined ? true : item.canEnterSettings;
      return item;
    });

    if(newTagSelected)
      add.push({
        id: search,
        name: search,
        canUpdate: true,
        canDelete: true,
        canEnterSettings: true,
      });

    onItemsAdd(add as TagsListItem[]);
    setOverlayVisible(false);
  };

  const toggleInput = React.useCallback((): void => {
    setSearch(DEFAULT_NAME);
    setNewTagSelected(false);
    setOverlayVisible(!overlayVisible);
    setSelectedTags({});
  }, [overlayVisible]);

  const focus = (inputRef: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>): void => {
    overlayVisible && inputRef.current && inputRef.current.focus();
  };

  const renderItems = (items: TagsListItem[]) => {
    const rendered = items
      .filter(item => {
        return !search ? true : item.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
      })
      .map((item: TagsListItem) => {
        return (
          <S.TagItem
            key={item.id}
            highlight={search}
            prefixel={<CheckboxComponent checked={selectedTags[item.id]} />}
            suffixel={item.description && <TagInfo info={item.description} />}
            onClick={(param: ClickParam) => {
              let checked: boolean | undefined = true;
              
              if(tristate && item.id in selectedTags && selectedTags[item.id] === undefined) {
                checked = false;
              } else if(tristate && item.id in selectedTags && selectedTags[item.id] === true) {
                checked = undefined;
              } else if(selectedTags[item.id]) {
                checked = false;
              }
              
              const newSelectedTags = {
                ...selectedTags,
                [item.id]: checked,
              };
              
              if(checked === false) 
                delete(newSelectedTags[item.id]);
              
              setSelectedTags(newSelectedTags);
            }}
          >
            {item.name}
          </S.TagItem>
        )
      });

    if(!rendered.length)
      return <Result description="No results" type="no-results" />;

    return rendered;
  }

  const renderedItems = renderItems(items);

  const renderAddTag = () => {
    const perfectMatch = items.filter((item) => {
      return item.name.toLowerCase().trim() === search.toLowerCase().trim();
    });

    if(search && !perfectMatch.length) {
      return (
        <>
          <S.TagItem
            onClick={() => {
              setNewTagSelected(!newTagSelected);
            }}
            prefixel={<Checkbox checked={newTagSelected} />}
          >
            Add: {search}
          </S.TagItem>
          <Menu.Divider />
        </>
      );
    }

    return null;
  }

  return (
    <Dropdown
      overlay={
        <Dropdown.Wrapper style={{width: 'auto', minWidth: '250px'}} ref={overlayRef}>
          <SearchBar 
            placeholder="Search"
            handleInputRef={focus}
            disabled={loading}
            iconLeft={<Icon component={<SearchM />}/>}
            value={search}
            onSearchChange={handleSearchChange}
          />
          <Menu asDropdownMenu style={{width: 'auto'}}>
            {searchAddTag && renderAddTag()}
            {loading ? <Loader
              color="blue"
              label="Loading..."
              labelPosition="bottom"
              size="L"
            /> : renderedItems}
          </Menu>
          <Dropdown.BottomAction 
            onClickAction={() => {}}
            style={{paddingLeft: '8px', paddingRight: '8px'}}
          >
            <div style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
              <div style={{flexGrow: 1}}>
                <Button type="ghost" mode="icon-label" onClick={onManageTags}>
                  <Icon component={<Settings2M />} size={24} />&nbsp;
                  {texts?.enterSettings}
                </Button>
              </div>
              {selected ? <Button type="ghost-primary" onClick={handleItemsAdd}>{texts?.applyAdd}</Button> : null}
            </div>
          </Dropdown.BottomAction>
        </Dropdown.Wrapper>
      }
      placement="bottomLeft"
      trigger={['click']}
      visible={overlayVisible}
      onVisibleChange={onVisibleChange}
    >
      <S.ButtonWrapper 
        onClick={toggleInput}
      >
        {trigger || <Button 
          type="ghost-primary" 
          mode="icon-label" 
          disabled={disabled}>
            <Icon component={<Add3M />} size={24} />
            {texts?.addItemLabel}
        </Button>}
      </S.ButtonWrapper>
    </Dropdown>
  );
};

export default AddModal;
