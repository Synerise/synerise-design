import React, { useRef, useEffect } from 'react';
import Icon from '@synerise/ds-icon';
import { NOOP } from '@synerise/ds-utils';
import { ItemProps } from '../Item.types';

import { validateItemName } from '../../../utils';
import Actions from '../../../Tree/Item/Actions';
import * as S from '../Item.styles';

export type BaseComponentProps = ItemProps & {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export const BaseComponent: React.FC<BaseComponentProps> = ({
  icon: IconComponent,
  item,
  // onVisibleChange = NOOP,
  editMode = false,
  onDelete = NOOP,
  onCopy = NOOP,
  onPaste = NOOP,
  onCut = NOOP,
  onDuplicate = NOOP,
  onEditMode = NOOP,
  onEditModeChange = NOOP,
  onSelected = NOOP,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClick = NOOP,
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode && inputRef.current) inputRef.current.focus();
  }, [editMode]);

  const changeName = (itemName: string, originalName: string): void => {
    if (validateItemName(itemName)) {
      const trimmedName = itemName.trim();
      onEditModeChange(trimmedName);
    } else {
      onEditModeChange(originalName);
    }
    onEditMode(false);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    changeName(event.target.value, item.model.name);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      changeName(target.value, item.model.name);
    }
  };

  const onVisibleChange = (visible: boolean): void => {
    onSelected(visible);
  };

  const onEdit = (): void => {
    onEditMode(true);
    onVisibleChange(false);
  };

  const suffixel = !editMode ? (
    <S.SuffixWrapper>
      <Actions
        item={item}
        texts={restProps.texts}
        onVisibleChange={onVisibleChange}
        onDelete={onDelete}
        onCopy={onCopy}
        onCut={onCut}
        onDuplicate={onDuplicate}
        onPaste={onPaste}
        onEdit={onEdit}
      />
    </S.SuffixWrapper>
  ) : (
    undefined
  );

  return (
    <S.Item
      suffixel={suffixel}
      suffixVisibilityTrigger="hover"
      prefixel={
        <>
          <Icon />
          <Icon component={<IconComponent />} size="24" />
        </>
      }
      {...restProps}
    >
      {editMode ? (
        <S.InlineEditWrapper>
          <S.InlineEditInput
            defaultValue={item.model.name}
            ref={inputRef}
            onBlur={handleOnBlur}
            onKeyDown={handleOnKeyDown}
          />
        </S.InlineEditWrapper>
      ) : (
        item.model.name
      )}
    </S.Item>
  );
};
