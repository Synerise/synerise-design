import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';

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
  onAdd,
}: Props) => {
  const [isAdding, setAddingState] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const onRemove = (tagKey: string | number): void =>
    onSelectedChange && onSelectedChange(selected.filter(tag => tag.id !== tagKey));

  const notSelectedList = data.filter(t => !selected.find(s => s.id === t.id));
  const selectablePool = !searchQuery
    ? notSelectedList
    : notSelectedList.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const isExactMatchFound = searchQuery && selectablePool.find(t => t.name === searchQuery);
  const emptyPool = selectablePool.length === 0;
  const isCreatable = creatable && !isExactMatchFound && searchQuery;

  const onPoolTagSelect = (tag: TagProps): void => {
    setAddingState(false);
    onAdd && onAdd(tag);
  };

  const dropdownOverlay = (
    <Dropdown.Wrapper>
      <S.DropdownSearch onSearchChange={setSearchQuery} placeholder={texts.searchPlaceholder} />
      <S.DropdownContainer>
        {isCreatable && (
          <>
            <S.AddTagDropdownButton type="ghost" icon="plus">
              <span>{texts.addTagButtonLabel}</span>
              <strong>{searchQuery}</strong>
            </S.AddTagDropdownButton>
            <S.Seperator />
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
    <S.Container className={className} style={style}>
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
          <S.AddButton type="ghost">
            {/* TODO(BLOCKED): ADD + ICON HERE */}
            {texts.addButtonLabel && <span>{texts.addButtonLabel}</span>}
          </S.AddButton>
        </Dropdown>
      )}
    </S.Container>
  );
};

Tags.defaultProps = {
  texts: {},
  selected: [],
};

export default Tags;
