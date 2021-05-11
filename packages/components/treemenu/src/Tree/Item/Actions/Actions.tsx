import React, { MouseEvent } from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import {
  EditM,
  DuplicateM,
  CopyClipboardM,
  CutM,
  PasteClipboardM,
  TrashM,
  OptionVerticalM,
  ShowCheckM,
  ShowBlockM,
  InfoFillM,
} from '@synerise/ds-icon/dist/icons';

import { MenuInfo } from 'rc-menu/lib/interface';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Tooltip from '@synerise/ds-tooltip';
import { ActionProps } from './Actions.types';
import * as S from './Actions.styles';

const triggerClick = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => event.stopPropagation();
const dropdownMenuClick = (event: MenuInfo): void => event.domEvent.stopPropagation();

const Actions: React.FC<ActionProps> = ({
  onEdit,
  onPaste,
  onCopy,
  onCut,
  onDuplicate,
  onDeleteConfirmationVisibilityChange,
  onVisibilityChange,
  item,
  texts,
}) => {
  const handleDuplicate = React.useCallback(
    (event: MenuInfo): void => {
      if (event) event.domEvent.stopPropagation();
      onDuplicate(item);
    },
    [item, onDuplicate]
  );

  const handleDelete = React.useCallback(
    (event: MenuInfo): void => {
      if (event) event.domEvent.stopPropagation();
      onDeleteConfirmationVisibilityChange(true);
    },
    [onDeleteConfirmationVisibilityChange]
  );

  const handleCopy = React.useCallback(
    (event: MenuInfo): void => {
      if (event) event.domEvent.stopPropagation();
      onCopy(item);
    },
    [onCopy, item]
  );

  const handleEdit = React.useCallback(
    (event: MenuInfo): void => {
      event.domEvent.stopPropagation();
      onEdit(item);
    },
    [onEdit, item]
  );

  const handleCut = React.useCallback(
    (event: MenuInfo) => {
      if (event) event.domEvent.stopPropagation();
      onCut(item);
    },
    [item, onCut]
  );

  const handlePaste = (event: MenuInfo): void => {
    if (event) event.domEvent.stopPropagation();
    typeof onPaste === 'function' && onPaste(item);
  };

  const handleItemVisibilityChange = (): void => {
    const newItem = { ...item };
    newItem.model.hidden = !newItem.model.hidden;
    onVisibilityChange && onVisibilityChange(item, [...item.getPath().shift()?.model.children]);
  };

  const visibilityIcon = React.useMemo(() => {
    return item.model.hidden ? <ShowCheckM /> : <ShowBlockM />;
  }, [item.model.hidden]);

  const visibilityLabel = React.useMemo(() => {
    return item.model.hidden ? texts?.showItem : texts?.hideItem;
  }, [item.model.hidden, texts]);

  return (
    <>
      <Dropdown
        placement="bottomRight"
        trigger={['click']}
        align={{ offset: [12, 16] }}
        overlay={
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
          <S.DropdownMenu asDropdownMenu onClick={dropdownMenuClick}>
            <S.DropdownMenuItem prefixel={<Icon component={<DuplicateM />} />} onClick={handleDuplicate}>
              {texts?.duplicate}
            </S.DropdownMenuItem>

            <S.DropdownMenuItem prefixel={<Icon component={<EditM />} />} onClick={handleEdit}>
              {texts?.edit}
            </S.DropdownMenuItem>

            <S.DropdownMenuItem prefixel={<Icon component={<CopyClipboardM />} />} onClick={handleCopy}>
              {texts?.copy}
            </S.DropdownMenuItem>

            <S.DropdownMenuItem
              prefixel={<Icon component={<PasteClipboardM />} />}
              onClick={handlePaste}
              disabled={!onPaste}
            >
              {texts?.paste}
            </S.DropdownMenuItem>

            <S.DropdownMenuItem
              prefixel={<Icon component={<CutM />} />}
              suffixel={
                <Tooltip title="Cut element should be pasted">
                  <Icon component={<InfoFillM />} color={theme.palette['grey-600']} />
                </Tooltip>
              }
              onClick={handleCut}
            >
              {texts?.cut}
            </S.DropdownMenuItem>

            {onVisibilityChange && (
              <S.DropdownMenuItem prefixel={<Icon component={visibilityIcon} />} onClick={handleItemVisibilityChange}>
                {visibilityLabel}
              </S.DropdownMenuItem>
            )}

            <Menu.Divider />
            <S.DropdownMenuItem prefixel={<Icon component={<TrashM />} />} type="danger" onClick={handleDelete}>
              {texts?.delete}
            </S.DropdownMenuItem>
          </S.DropdownMenu>
        }
      >
        {/*
        // @ts-ignore */}
        <S.DropdownTrigger component={<OptionVerticalM />} onClick={triggerClick} />
      </Dropdown>
    </>
  );
};

export default Actions;
