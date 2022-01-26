import React, { useMemo, useState, useEffect, useRef } from 'react';

import Tooltip from '@synerise/ds-tooltip';
import Icon, { AngleRightS, FolderM, AddS } from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { NOOP } from '@synerise/ds-utils';

import { VisibilityTrigger } from '@synerise/ds-menu/dist/Menu.types';
import AddModal from '../../../AddModal';
import Actions from '../../../Tree/Item/Actions';

import { validateItemName } from '../../../utils';
import { TreeNode } from '../../../TreeMenu.types';
import { ItemProps } from '../Item.types';
import * as S from './Folder.styles';
import * as As from '../../../Tree/Item/Actions/Actions.styles';
import * as Is from '../Item.styles';

type FolderProps = ItemProps;

const Folder: React.FC<FolderProps> = ({
  item,
  type,
  expanded = false,
  editMode = false,
  itemTypes,
  onDelete = NOOP,
  onCopy = NOOP,
  onPaste = NOOP,
  onCut = NOOP,
  onDuplicate = NOOP,
  onEditMode = NOOP,
  onEditModeChange = NOOP,
  onExpandToggle = NOOP,
  onSelected = NOOP,
  texts,
  onClick,
  onAdd,
  ...props
}) => {
  const { name } = item.model;
  const [currentExpanded, setExpanded] = useState<boolean>(expanded);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasChildren = item.hasChildren();

  useEffect(() => {
    if (editMode && inputRef.current) inputRef.current.focus();
  }, [editMode]);

  useEffect(() => {
    setExpanded(expanded);
  }, [expanded]);

  const onToggleExpand = (): void => {
    setExpanded(!currentExpanded);
    onExpandToggle(item, !currentExpanded);
  };

  const prefixel = useMemo((): React.ReactNode => {
    const style = hasChildren ? {} : { opacity: 0.3 };

    return (
      <>
        <S.ArrowIcon expanded={currentExpanded} component={<AngleRightS />} style={style} />
        <Icon color={theme.palette['grey-700']} component={<FolderM />} />
      </>
    );
  }, [currentExpanded, hasChildren]);

  const suffixel = (): React.ReactNode => {
    if (editMode) return undefined;

    const onVisibleChange = (visible: boolean): void => {
      onSelected(visible);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOnItemAdd = (addItem: any, context: TreeNode | undefined): void => {
      onAdd(addItem, context);
      onSelected(false);
    };

    const handleOnEdit = (): void => {
      onEditMode(true);
      onVisibleChange(false);
    };

    return (
      <Is.SuffixWrapper>
        <AddModal
          context={item}
          itemTypes={itemTypes}
          onVisibleChange={onVisibleChange}
          onItemAdd={handleOnItemAdd}
          align={{ offset: [32, 16] }}
          texts={texts}
        >
          <Tooltip title={texts?.addItemLabel} mouseLeaveDelay={0}>
            <As.DropdownTrigger component={<AddS />} />
          </Tooltip>
        </AddModal>
        <Actions
          item={item}
          texts={texts}
          onDelete={onDelete}
          onPaste={onPaste}
          onCopy={onCopy}
          onCut={onCut}
          onDuplicate={onDuplicate}
          onEdit={handleOnEdit}
          deleteMode={false}
          onDeleteConfirmationVisibilityChange={NOOP}
          onVisibilityChange={NOOP}
        />
      </Is.SuffixWrapper>
    );
  };

  const handleExpandToggle = editMode
    ? NOOP
    : (): void => {
        onToggleExpand();
      };

  const changeName = (itemName: string, originalName: string): void => {
    if (validateItemName(itemName)) {
      const trimmedName = itemName.trim();
      onEditModeChange(trimmedName);
    } else {
      onEditModeChange(originalName);
    }
    onEditMode(false);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    changeName(event.target.value, item.model.name);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement;
      changeName(target.value, item.model.name);
    }
  };

  return (
    <S.FolderItem
      onClick={handleExpandToggle}
      prefixel={prefixel}
      suffixel={suffixel}
      suffixVisibilityTrigger={VisibilityTrigger.HOVER}
      {...props}
    >
      {editMode ? (
        <Is.InlineEditWrapper>
          <Is.InlineEditInput defaultValue={name} ref={inputRef} onBlur={handleBlur} onKeyDown={handleKeyDown} />
        </Is.InlineEditWrapper>
      ) : (
        name
      )}
    </S.FolderItem>
  );
};

export default Folder;
