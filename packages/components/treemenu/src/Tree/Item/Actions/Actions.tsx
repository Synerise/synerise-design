import * as React from 'react';
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
  const deleteConfirmRef = React.useRef<HTMLButtonElement | null>(null);

  const handleOnClick = (event?: React.MouseEvent<HTMLElement, MouseEvent> | undefined): void => {
    if (event) event.stopPropagation();
    onVisibleChange(false);
  };

  const handleOnConfirm = (event?: React.MouseEvent<HTMLElement, MouseEvent> | undefined): void => {
    if (event) event.stopPropagation();
    onDelete(item);
    onVisibleChange(false);
  };

  const handleVisibilityChange = (visibility: boolean): void => {
    onVisibleChange(visibility);
  };

  const handleDelete = (): void => {
    if (deleteConfirmRef.current) {
      deleteConfirmRef.current.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
    }
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
            {onDuplicate ? (
              <S.DropdownMenuItem
                prefixel={<Icon component={<DuplicateM />} />}
                onClick={(e: ClickParam): void => {
                  e.domEvent.stopPropagation();
                  onDuplicate(item);
                  onVisibleChange(false);
                }}
              >
                {texts?.duplicate}
              </S.DropdownMenuItem>
            ) : null}

            {onEdit ? (
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
            ) : null}

            {onCopy ? (
              <S.DropdownMenuItem
                prefixel={<Icon component={<CopyClipboardM />} />}
                onClick={(e: ClickParam): void => {
                  e.domEvent.stopPropagation();
                  onCopy(item);
                  onVisibleChange(false);
                }}
              >
                {texts?.copy}
              </S.DropdownMenuItem>
            ) : null}

            {onPaste ? (
              <S.DropdownMenuItem
                prefixel={<Icon component={<PasteClipboardM />} />}
                onClick={(e: ClickParam): void => {
                  e.domEvent.stopPropagation();
                  onPaste(item);
                  onVisibleChange(false);
                }}
              >
                {texts?.paste}
              </S.DropdownMenuItem>
            ) : null}

            {onCut ? (
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
            ) : null}

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
        onConfirm={handleOnConfirm}
        onCancel={handleOnClick}
        onClick={handleOnClick}
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
