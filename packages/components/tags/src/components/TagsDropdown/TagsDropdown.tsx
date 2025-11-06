import React, { type ReactNode } from 'react';

import Dropdown, { type DropdownSharedProps } from '@synerise/ds-dropdown';
import InformationCard from '@synerise/ds-information-card';
import Tag, {
  type TagProps,
  type TagShape,
  type TagTexts,
} from '@synerise/ds-tag';
import { NOOP } from '@synerise/ds-utils';

import { type ExtendedTagProps } from '../../Tags.types';
import * as S from './TagsDropdown.styles';

type TagDropdownProps = {
  tags?: ExtendedTagProps[];
  texts?: TagTexts;
  removable?: boolean;
  disabled?: boolean;
  asPill?: boolean;
  tagShape?: TagShape;
  dropdownFooter?: ReactNode;
  noTagsContent?: ReactNode;
  aboveTagsContent?: ReactNode;
  dropdownHeader?: ReactNode;
  maxHeight?: number;
  onRemove?: (tagKey: string | number) => void;
  onTagClick?: (tag: TagProps) => void;
  componentId: string;
} & Omit<DropdownSharedProps, 'overlay'>;

export const TagsDropdown = ({
  tags,
  tagShape,
  texts,
  removable,
  disabled,
  onRemove,
  asPill,
  dropdownFooter,
  noTagsContent,
  dropdownHeader,
  aboveTagsContent,
  maxHeight,
  onTagClick,
  componentId,
  ...dropdownProps
}: TagDropdownProps) => {
  const areTags = !!tags?.length;

  return (
    <Dropdown
      popoverProps={{
        componentId,
        testId: `${componentId}`,
        ...dropdownProps?.popoverProps,
      }}
      {...dropdownProps}
      size="small"
      overlay={
        <S.Overlay data-testid="ds-tags-dropdown-overlay">
          {dropdownHeader}
          <S.DropdownContainer absolute maxHeight={maxHeight}>
            {aboveTagsContent}
            {areTags ? (
              <S.DropdownTagsContainer data-testid="ds-tags-available-tags">
                {tags.map((tag) => (
                  <Tag
                    {...tag}
                    key={tag.id}
                    shape={tagShape}
                    removable={removable}
                    onRemove={removable ? onRemove : undefined}
                    disabled={disabled}
                    asPill={asPill}
                    onClick={() => onTagClick?.(tag)}
                    texts={texts}
                    tooltipProps={
                      tag.informationCardProps
                        ? {
                            render: () => (
                              <InformationCard
                                title={tag.name}
                                {...tag.informationCardProps}
                                asTooltip
                              />
                            ),
                            placement: 'right',
                            ...tag.tooltipProps,
                          }
                        : undefined
                    }
                  />
                ))}
              </S.DropdownTagsContainer>
            ) : (
              noTagsContent
            )}
          </S.DropdownContainer>
          {dropdownFooter && (
            <S.BottomAction onClickAction={NOOP}>
              {dropdownFooter}
            </S.BottomAction>
          )}
        </S.Overlay>
      }
    />
  );
};
