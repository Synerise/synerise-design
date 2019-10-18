import * as React from 'react';
import { withTheme } from 'styled-components';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import { ReactComponent as AddThreeM } from '@synerise/ds-icon/dist/icons/add-3-m.svg';

import { Props } from './Tags.types';
import * as S from './Tags.styles';
import Tag from './Tag/Tag';
import { Props as TagProps } from './Tag/Tag.types';

const Tags: React.FC<Props> = ({
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
}: Props) => {
  const [isAdding, setAddingState] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const addIcon = (
    <S.AddIconWrapper>
      <Icon component={<AddThreeM />} size={24} color={theme.palette['grey-500']} />
    </S.AddIconWrapper>
  );

  const onRemove = (tagKey: string | number): void =>
    onSelectedChange && onSelectedChange(selected.filter(tag => tag.id !== tagKey));

  const notSelectedList = data.filter(t => !selected.find(s => s.id === t.id));
  const selectablePool = !searchQuery
    ? notSelectedList
    : notSelectedList.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const isExactMatchFound = searchQuery && selectablePool.find(t => t.name === searchQuery);
  const emptyPool = selectablePool.length === 0;
  const isCreatable = creatable && !isExactMatchFound && searchQuery;
  const isSeperated = !(!manageLink && emptyPool);

  const reset = (): void => {
    setAddingState(false);
    setSearchQuery('');
  };

  const onPoolTagSelect = (tag: TagProps): void => {
    onSelectedChange && onSelectedChange([...selected, tag]);
    reset();
  };

  const onCreateNewTag = (): void => {
    onCreate && onCreate(searchQuery);
    reset();
  };

  const dropdownOverlay = (
    <Dropdown.Wrapper>
      <S.DropdownSearch value={searchQuery} onSearchChange={setSearchQuery} placeholder={texts.searchPlaceholder} />
      <S.DropdownContainer data-testid="dropdown">
        {isCreatable && (
          <>
            <S.CreateTagDropdownButton type="ghost" onClick={onCreateNewTag} marginless={!isSeperated}>
              {addIcon}
              <span>{texts.createTagButtonLabel}</span>
              <strong>{searchQuery}</strong>
            </S.CreateTagDropdownButton>

            {isSeperated && <S.Seperator />}
          </>
        )}

        {!emptyPool && (
          <S.DropdownTagsContainer isCreatable={isCreatable}>
            {selectablePool.map(tag => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Tag {...tag} key={tag.id} shape={tagShape} onClick={(): void => onPoolTagSelect(tag)} />
            ))}
          </S.DropdownTagsContainer>
        )}

        {emptyPool && !isCreatable && !manageLink && <S.DropdownNoTags>{texts.dropdownNoTags}</S.DropdownNoTags>}

        {manageLink && !selectablePool.length && (
          <>
            <S.ManageLink href={manageLink} onlyChild={emptyPool && !isCreatable}>
              {texts.manageLinkLabel}
            </S.ManageLink>
          </>
        )}
      </S.DropdownContainer>
    </Dropdown.Wrapper>
  );

  return (
    <S.Container className={className} style={style} data-testid="tags">
      <S.SelectedTags>
        {selected.map(tag => (
          <Tag
            key={tag.id}
            shape={tagShape}
            removable={removable}
            onRemove={removable ? onRemove : undefined}
            disabled={disabled}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...tag}
          />
        ))}
      </S.SelectedTags>
      {addable && (
        <Dropdown
          trigger={['click']}
          placement="bottomLeft"
          visible={isAdding}
          onVisibleChange={setAddingState}
          overlay={dropdownOverlay}
        >
          <S.AddButton type="ghost" marginless={!selected.length ? true : undefined}>
            {addIcon}
            {texts.addButtonLabel && <span>{texts.addButtonLabel}</span>}
          </S.AddButton>
        </Dropdown>
      )}
    </S.Container>
  );
};

Tags.defaultProps = {
  texts: {},
  data: [],
  selected: [],
};

export default withTheme(Tags);
