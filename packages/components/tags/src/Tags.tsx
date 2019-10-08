import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';

import { Props } from './Tags.types';
import * as S from './Tags.styles';
import Tag from './Tag/Tag';

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
}: Props) => {
  const [isAdding, setAddingState] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const onRemove = (tagKey: string | number): void =>
    onSelectedChange && onSelectedChange(selected.filter(tag => tag.id !== tagKey));

  const notSelectedList = data.filter(t => !selected.find(s => s.id === t.id));
  const dropdownList = !searchQuery
    ? notSelectedList
    : notSelectedList.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const isExactMatchFound = searchQuery && dropdownList.find(t => t.name === searchQuery);
  const isCreatable = creatable && !isExactMatchFound && searchQuery;

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

        {dropdownList.length > 0 && (
          <S.DropdownTagsContainer isCreatable={isCreatable}>
            {dropdownList.map(tag => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <Tag key={tag.id} shape={tagShape} {...tag} />
            ))}
          </S.DropdownTagsContainer>
        )}

        {manageLink && !dropdownList.length && (
          <>
            <S.ManageLink href={manageLink}>{texts.manageLinkLabel}</S.ManageLink>
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
