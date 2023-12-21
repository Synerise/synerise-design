{
  import type {
    Meta,
    StoryObj
  } from '@storybook/react';
  import * as React from 'react';
  import {
    withTheme
  } from 'styled-components';
  import Dropdown from '@synerise/ds-dropdown';
  import Icon, {
    Add3M,
    SearchM,
    SettingsM
  } from '@synerise/ds-icon';
  import Result from '@synerise/ds-result';
  import {
    Props
  } from './Tags.types';
  import * as S from './Tags.styles';
  import Tag from './Tag/Tag';
  import {
    Props as TagProps
  } from './Tag/Tag.types';
  const meta: Meta < Props > = {
    title: 'Tags',
    component: Tags,
  };
  export default meta;
  const excludedProps = ['selected'];
  const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
  type Story = StoryObj < Props > ;
  const Tags: React.FC < Props > = ({
    data,
    tagShape,
    onSelectedChange,
    disabled,
    removable,
    addable,
    creatable,
    texts,
    selected,
    style,
    className,
    manageLink,
    onCreate,
    theme,
    maxHeight,
    overlayStyle,
    overlayPlacement,
    asPill,
    onManageTagClick,
  }: Props) => {
    const [isAdding, setAddingState] = React.useState < boolean > (false);
    const [searchQuery, setSearchQuery] = React.useState < string > ('');
    const addIcon = (<S.AddIconWrapper>
      <Icon component={<Add3M />} size={24} color={theme.palette['grey-500']} />
    </S.AddIconWrapper>);
    const onRemove = (tagKey: string | number): void => {
      if (!onSelectedChange || !selected) {
        return;
      }
      const removedTag = selected.find(tag => tag.id === tagKey);
      if (!removedTag) {
        return;
      }
      onSelectedChange(selected.filter(tag => tag.id !== tagKey), {
        type: 'REMOVE',
        tag: removedTag,
      });
    };
    const notSelectedList = data && selected && data.filter(t => !selected.find(s => s.id === t.id));
    const selectablePool = !searchQuery ? notSelectedList : notSelectedList && notSelectedList.filter(t => t.name && t.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const isExactMatchFound = searchQuery && selectablePool && selectablePool.find(t => t.name === searchQuery);
    const emptyPool = selectablePool && selectablePool.length === 0;
    const isCreatable = creatable && !isExactMatchFound && searchQuery;
    const isSeperated = !(!manageLink && emptyPool);
    const reset = (): void => {
      setAddingState(false);
      setSearchQuery('');
    };
    const onPoolTagSelect = (tag: TagProps): void => {
      onSelectedChange && selected && onSelectedChange([...selected, tag], {
        type: 'ADD',
        tag,
      });
      reset();
    };
    const onCreateNewTag = (): void => {
      onCreate && onCreate(searchQuery);
      reset();
    };
    const dropdownOverlay = (<S.Overlay data-testid="dropdown">
      <S.DropdownSearch
        value={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder={(texts && texts.searchPlaceholder) || ''}
        iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
        onClearInput={(): void => setSearchQuery('')}
        clearTooltip={texts && texts.clearTooltip}
      />

      <S.DropdownContainer maxHeight={maxHeight} style={{ padding: '12px' }}>
        {isCreatable && (
          <>
            <S.CreateTagDropdownButton type="ghost" onClick={onCreateNewTag} marginless={!isSeperated}>
              {addIcon}
              <span>{texts && texts.createTagButtonLabel}</span>
              <strong>{searchQuery}</strong>
            </S.CreateTagDropdownButton>
            {isSeperated && <S.Seperator />}
          </>
        )}

        {!emptyPool && (
          <S.DropdownTagsContainer isCreatable={!!isCreatable}>
            {selectablePool &&
              selectablePool.map(tag => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Tag {...tag} key={tag.id} shape={tagShape} onClick={(): void => onPoolTagSelect(tag)} texts={texts} />
              ))}
          </S.DropdownTagsContainer>
        )}

        {emptyPool && !isCreatable && !manageLink && (
          <S.DropdownNoTags>{texts && texts.dropdownNoTags}</S.DropdownNoTags>
        )}

        {emptyPool && isCreatable && (
          <Result type="no-results" noSearchResults description={texts?.noResultsLabel || 'No results'} />
        )}
      </S.DropdownContainer>

      {manageLink && selectablePool && !selectablePool.length && (
        <Dropdown.BottomAction
          onClickAction={(): void => {
            onManageTagClick && onManageTagClick();
          }}
          style={{ padding: '0 8px', cursor: 'auto' }}
        >
          <S.ManageLinkButton
            type="ghost"
            mode="icon-label"
            href={manageLink}
            onlyChild={!!(emptyPool && !isCreatable)}
          >
            <Icon component={<SettingsM />} size={20} color={theme.palette['grey-500']} />{' '}
            {texts && texts.manageLinkLabel}
          </S.ManageLinkButton>
        </Dropdown.BottomAction>
      )}
    </S.Overlay>);
    return (<S.Container className={`ds-tags ${className || ''}`} style={style} data-testid="tags">
      <S.SelectedTags>
        {selected &&
          selected.map(tag => (
            <Tag
              key={tag.id}
              shape={tagShape}
              removable={removable}
              onRemove={removable ? onRemove : undefined}
              disabled={disabled}
              texts={texts}
              asPill={asPill}
              {...tag}
            />
          ))}
        {addable && (
          <Dropdown
            trigger={['click']}
            placement={overlayPlacement}
            visible={isAdding}
            onVisibleChange={setAddingState}
            overlay={dropdownOverlay}
            overlayStyle={overlayStyle}
          >
            <S.AddButton type="ghost" marginless={selected && !selected.length ? true : undefined}>
              {addIcon}
              {texts && texts.addButtonLabel && <span>{texts.addButtonLabel}</span>}
            </S.AddButton>
          </Dropdown>
        )}
      </S.SelectedTags>
    </S.Container>);
  };
  Tags.defaultProps = {
    texts: {},
    data: [],
    selected: [],
  };
  const StoryTemplate: Story = {
    render: (args) => <Tags {...args} />,
  };
  export const Primary = {
    ...StoryTemplate,
    args: {
      // Add component's props
      data: [{
        id: 1,
        name: 'Tag 1'
      }, {
        id: 2,
        name: 'Tag 2'
      }, {
        id: 3,
        name: 'Tag 3'
      }, ],
      tagShape: 'default',
      onSelectedChange: (selected: TagProps[]) => {
        console.log('onSelectedChange', selected);
      },
      disabled: false,
      removable: true,
      addable: true,
      creatable: true,
      texts: {
        searchPlaceholder: 'Search tags',
        clearTooltip: 'Clear search query',
        createTagButtonLabel: 'Create',
        dropdownNoTags: 'No tags',
        noResultsLabel: 'No results',
        manageLinkLabel: 'Manage tags',
        addButtonLabel: 'Add tag',
      },
      selected: [{
        id: 1,
        name: 'Tag 1'
      }, {
        id: 2,
        name: 'Tag 2'
      }, ],
      style: {},
      className: '',
      manageLink: 'manage-link',
      onCreate: (tagName: string) => {
        console.log('onCreate', tagName);
      },
      theme: {}, // Provide theme props if necessary
      maxHeight: 'auto',
      overlayStyle: {},
      overlayPlacement: 'bottomLeft',
      asPill: false,
      onManageTagClick: () => {
        console.log('onManageTagClick');
      },
    },
  };
}