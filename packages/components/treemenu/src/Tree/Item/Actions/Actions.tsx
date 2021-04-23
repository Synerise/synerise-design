import React, { useRef } from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import {
  EditM,
  OptionHorizontalM,
  DuplicateM,
  CopyClipboardM,
  CutM,
  PasteClipboardM,
  TrashM,
  WarningFillM,
} from '@synerise/ds-icon/dist/icons';
import { NOOP } from '@synerise/ds-utils';
import { ClickParam } from 'antd/es/menu';

import { ActionProps } from './Actions.types';
import * as S from './Actions.styles';

const triggerClick = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => event.stopPropagation();
const dropdownMenuClick = (event: ClickParam): void => event.domEvent.stopPropagation();

type ClickEvent = React.MouseEvent<HTMLElement, MouseEvent> | undefined;

const Actions: React.FC<ActionProps> = ({
  onVisibleChange = NOOP,
  onEdit = NOOP,
  onDelete = NOOP,
  onPaste = NOOP,
  onCopy = NOOP,
  onCut = NOOP,
  onDuplicate = NOOP,
  item,
  texts,
}) => {
  const deleteConfirmRef = useRef<HTMLButtonElement | null>(null);
  const copyRef = useRef<TreeNode | null>(null);

  const handleDuplicate = (event?: ClickParam): void => {
    if (event) event.domEvent.stopPropagation();
    onDuplicate(item);
    onVisibleChange(false);
  };

  const handleDeleteCancel = (event?: ClickEvent): void => {
    if (event) event.stopPropagation();
    onVisibleChange(false);
  };

  const handleDeleteConfirm = (event?: ClickEvent): void => {
    if (event) event.stopPropagation();
    const root = item.getPath().shift();
    item.drop();
    onDelete([...root.model.children], item);
    onVisibleChange(false);
  };

  const handleDelete = (): void => {
    if (deleteConfirmRef.current) {
      deleteConfirmRef.current.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    }
  };

  const handleCopy = (): void => {
    copyRef.current = item;
    onCopy(item);
    onVisibleChange(false);
  };

  const handlePaste = (): void => {
    copyRef.current = item;
    onPaste(item);
    onVisibleChange(false);
  };

  const handleVisibilityChange = (visibility: boolean): void => {
    onVisibleChange(visibility);
  };

  return (
    <>
      <Dropdown
        placement="bottomRight"
        trigger={['click']}
        onVisibleChange={onVisibleChange}
        align={{ offset: [12, 16] }}
        overlay={
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
          <S.DropdownMenu asDropdownMenu onClick={dropdownMenuClick}>
            <S.DropdownMenuItem prefixel={<Icon component={<DuplicateM />} />} onClick={handleDuplicate}>
                {texts?.duplicate}
              </S.DropdownMenuItem>

            <S.DropdownMenuItem
                prefixel={<Icon component={<EditM />} />}
                onClick={(e: ClickParam): void => {
                  e.domEvent.stopPropagation();
                  onEdit(item);
                  onVisibleChange(false);
                }}
              >
                {texts?.edit}
              </S.DropdownMenuItem>

            <S.DropdownMenuItem prefixel={<Icon component={<CopyClipboardM />} />} onClick={handleCopy}>
                {texts?.copy}
              </S.DropdownMenuItem>

            <S.DropdownMenuItem prefixel={<Icon component={<PasteClipboardM />} />} onClick={handlePaste}>
                {texts?.paste}
              </S.DropdownMenuItem>

            <S.DropdownMenuItem
                prefixel={<Icon component={<CutM />} />}
                onClick={(e: ClickParam): void => {
                  e.domEvent.stopPropagation();
                  onCut(item);
                  onVisibleChange(false);
                }}
              >
                {texts?.cut}
              </S.DropdownMenuItem>

            <Menu.Divider />
            <S.DropdownMenuItem prefixel={<Icon component={<TrashM />} />} type="danger" onClick={handleDelete}>
              {texts?.delete}
            </S.DropdownMenuItem>
          </S.DropdownMenu>
        }
      >
        <S.DropdownTrigger component={<OptionHorizontalM />} onClick={triggerClick} />
      </Dropdown>
      <S.DeletePopconfirm
        title={texts?.deleteConfirm}
        trigger="click"
        cancelText="No"
        icon={<Icon color="#ffc300" component={<WarningFillM />} />}
        okText="Yes"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        onClick={handleDeleteCancel}
        onVisibleChange={handleVisibilityChange}
      >
        <button type="button" ref={deleteConfirmRef} aria-hidden>
          Delete
        </button>
      </S.DeletePopconfirm>
    </>
  );
};

export default Actions;
