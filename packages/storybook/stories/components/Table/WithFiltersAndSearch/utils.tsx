import React from "react";
import { action } from 'storybook/actions';

import { ItemType } from '@synerise/ds-menu';
import Tooltip from '@synerise/ds-tooltip';
import Switch from '@synerise/ds-switch';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { DuplicateM, EditM, OptionHorizontalM, TrashM } from '@synerise/ds-icon';
import { TableCell } from "@synerise/ds-table";
import Button from "@synerise/ds-button";

import * as S from './styles';

export const getColumnsWithActions = columns => {
  const baseColumns = columns
    .filter(column => column.visible)
    .map(column => {
      switch (column.key) {
        case 'active': {
          return {
            ...column,
            title: column.name,
            dataIndex: column.key,
            render: active => (
              <Tooltip title={active ? 'Switch off' : 'Switch on'} placement="topLeft">
                <Switch onChange={action('Status change')} checked={active} label="" />
              </Tooltip>
            ),
          };
        }
        case 'country': {
          return {
            ...column,
            title: column.name,
            dataIndex: column.key,
            render: country => <TableCell.FlagLabelCell countryCode={country.code} label={country.name} />,
          };
        }
        default:
          return {
            ...column,
            title: column.name,
            dataIndex: column.key,
          };
      }
    });

  return [
    ...baseColumns,
    {
      render: () => (
        <TableCell.ActionCell>
          <Dropdown
            overlayStyle={{ boxShadow: '0 4px 12px 0 rgba(35, 41, 54, 0.07)' }}
            overlay={
              <S.DropdownMenu>
                <S.DropdownMenuItem onClick={action('Edit')} prefixel={<Icon component={<EditM />} />}>
                  Edit
                </S.DropdownMenuItem>
                <S.DropdownMenuItem onClick={action('Duplicate')} prefixel={<Icon component={<DuplicateM />} />}>
                  Duplicate
                </S.DropdownMenuItem>
                <S.DropdownMenuItem
                  onClick={action('Delete')}
                  type={ItemType.DANGER}
                  prefixel={<Icon component={<TrashM />} />}
                >
                  Delete
                </S.DropdownMenuItem>
              </S.DropdownMenu>
            }
            trigger={['click']}
          >
            <Button type="ghost" mode="single-icon">
              <Icon component={<OptionHorizontalM />} />
            </Button>
          </Dropdown>
        </TableCell.ActionCell>
      ),
    },
  ];
};