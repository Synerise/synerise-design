import React, { useMemo, useState, useEffect, useRef } from 'react';

import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { AngleRightS, FolderM, AddS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { NOOP } from '@synerise/ds-utils';

import AddModal from '../../AddModal';
import Actions from '../../Actions';

import { TreeMenuNode } from '../../../TreeMenu.types';
import { ItemProps } from '../Item.types';
import * as S from './Folder.styles';
import * as As from '../../Actions/Actions.styles';
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
    const handleOnItemAdd = (addItem: any, context: TreeMenuNode | undefined): void => {
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
        >
          <Tooltip title={texts?.addItemLabel} mouseLeaveDelay={0}>
            <As.DropdownTrigger component={<AddS />} />
          </Tooltip>
        </AddModal>
        <Actions
          item={item}
          texts={texts}
          onVisibleChange={onVisibleChange}
          onDelete={onDelete}
          onPaste={onPaste}
          onCopy={onCopy}
          onCut={onCut}
          onDuplicate={onDuplicate}
          onEdit={handleOnEdit}
        />
      </Is.SuffixWrapper>
    );
  };

  const handleOnClick = editMode
    ? NOOP
    : (): void => {
        onToggleExpand();
      };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      onEditModeChange(event);
      onEditMode(false);
    }
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    onEditModeChange(event);
    onEditMode(false);
  };

  return (
    <S.FolderItem onClick={handleOnClick} prefixel={prefixel} suffixel={suffixel} {...props}>
      {editMode ? (
        <Is.InlineEditWrapper>
          <Is.InlineEditInput defaultValue={name} ref={inputRef} onBlur={handleOnBlur} onKeyDown={handleOnKeyDown} />
        </Is.InlineEditWrapper>
      ) : (
        name
      )}
    </S.FolderItem>
  );
};

export default Folder;
