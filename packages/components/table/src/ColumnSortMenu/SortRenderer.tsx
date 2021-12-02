import { partial } from 'lodash';
import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { Close2M, SortAscendingM, SortDescendingM, SortAzM, SortZaM } from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import { DSColumnType, OnSortFn } from '../Table.types';
import { TableLocaleContext } from '../utils/locale';
import * as S from './SortRender.styles';
import { SortStateAPI, toSortOrder } from './useSortState';
import { CheckIcon, DefaultSortIcon, StringSortIcon } from './SortIcons';

interface SortRendererProps<T> {
  sortStateApi: SortStateAPI;
  column: DSColumnType<T>;
  onSort?: OnSortFn;
}

const handleButtonClick = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
  e.stopPropagation();
};

export const CommonRenderer = <T extends unknown>({
  column,
  sortStateApi,
  onSort,
}: SortRendererProps<T>): React.ReactElement => {
  const { getColumnSortOrder, setColumnSortOrder } = sortStateApi;
  const columnKey = String(column.key);
  const columnSortOrder = column.key ? getColumnSortOrder(columnKey) : null;
  const onSortOrderChange = partial(setColumnSortOrder, columnKey);
  const [isDropdownVisible, setIsDropdownVisible] = React.useState<boolean>(false);

  return (
    <TableLocaleContext.Consumer>
      {(locale): React.ReactElement => (
        <Dropdown
          onVisibleChange={(isVisible): void => {
            if (isVisible !== isDropdownVisible) {
              setIsDropdownVisible(isVisible);
            }
          }}
          overlay={
            <Dropdown.Wrapper style={{ width: 220 }}>
              <Menu
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                asDropdownMenu
                onClick={({ key }): void => {
                  onSort && onSort(columnKey, toSortOrder(String(key)));
                  onSortOrderChange(toSortOrder(String(key)));
                }}
                style={{ width: 220 }}
              >
                <Menu.Item
                  key="ascend"
                  prefixel={<Icon component={<SortAscendingM />} />}
                  suffixel={<CheckIcon isActive={columnSortOrder === 'ascend'} />}
                >
                  {locale.columnSortAscend}
                </Menu.Item>
                <Menu.Item
                  key="descend"
                  prefixel={<Icon component={<SortDescendingM />} />}
                  suffixel={<CheckIcon isActive={columnSortOrder === 'descend'} />}
                >
                  {locale.columnSortDescend}
                </Menu.Item>
                {!!columnSortOrder && (
                  <Menu.Item
                    key="null"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    type="danger"
                    prefixel={<Icon component={<Close2M />} />}
                  >
                    {locale.columnSortClear}
                  </Menu.Item>
                )}
              </Menu>
            </Dropdown.Wrapper>
          }
        >
          <S.ToggleButton
            isVisible={isDropdownVisible}
            type="ghost"
            mode="single-icon"
            className="ds-sort-dropdown-button"
            onClick={handleButtonClick}
          >
            <DefaultSortIcon sortOrder={columnSortOrder} />
          </S.ToggleButton>
        </Dropdown>
      )}
    </TableLocaleContext.Consumer>
  );
};

export const StringRenderer = <T extends unknown>({
  column,
  sortStateApi,
  onSort,
}: SortRendererProps<T>): React.ReactElement => {
  const { getColumnSortOrder, setColumnSortOrder } = sortStateApi;
  const columnKey = String(column.key);
  const columnSortOrder = column.key ? getColumnSortOrder(columnKey) : null;
  const onSortOrderChange = partial(setColumnSortOrder, columnKey);
  const [isDropdownVisible, setIsDropdownVisible] = React.useState<boolean>(false);

  return (
    <TableLocaleContext.Consumer>
      {(locale): React.ReactElement => (
        <Dropdown
          onVisibleChange={(isVisible): void => {
            if (isVisible !== isDropdownVisible) {
              setIsDropdownVisible(isVisible);
            }
          }}
          overlay={
            <Dropdown.Wrapper style={{ width: 170 }}>
              <Menu
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                asDropdownMenu
                onClick={({ key }): void => {
                  onSort && onSort(columnKey, toSortOrder(String(key)));
                  onSortOrderChange(toSortOrder(String(key)));
                }}
                style={{ width: 170 }}
              >
                <Menu.Item
                  key="ascend"
                  prefixel={<Icon component={<SortAzM />} />}
                  suffixel={<CheckIcon isActive={columnSortOrder === 'ascend'} />}
                >
                  {locale.columnSortAz}
                </Menu.Item>
                <Menu.Item
                  key="descend"
                  prefixel={<Icon component={<SortZaM />} />}
                  suffixel={<CheckIcon isActive={columnSortOrder === 'descend'} />}
                >
                  {locale.columnSortZa}
                </Menu.Item>
                {!!columnSortOrder && (
                  <Menu.Item
                    key="null"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    type="danger"
                    prefixel={<Icon component={<Close2M />} />}
                  >
                    {locale.columnSortClear}
                  </Menu.Item>
                )}
              </Menu>
            </Dropdown.Wrapper>
          }
        >
          <S.ToggleButton
            isVisible={isDropdownVisible}
            type="ghost"
            mode="single-icon"
            className="ds-sort-dropdown-button"
            onClick={handleButtonClick}
          >
            <StringSortIcon sortOrder={columnSortOrder} />
          </S.ToggleButton>
        </Dropdown>
      )}
    </TableLocaleContext.Consumer>
  );
};
