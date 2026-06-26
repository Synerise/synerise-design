import React, {
  type KeyboardEvent,
  useCallback,
  useMemo,
  useState,
} from 'react';

import Button from '@synerise/ds-button';
import Icon, {
  AngleLeftS,
  AngleRightS,
  DoubleAngleLeftS,
  DoubleAngleRightS,
  OptionHorizontalM,
} from '@synerise/ds-icon';
import Select from '@synerise/ds-select';

import * as S from './Pagination.styles';
import { type PaginationProps } from './Pagination.types';
import { getJumpSize, getPages } from './getPages';

const DEFAULT_PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

const NavIcon = ({ component }: { component: React.ReactNode }) => (
  <Button mode="single-icon" type="ghost">
    <Icon component={component} />
  </Button>
);

const JumpButton = ({ next }: { next?: boolean }) => (
  <Button mode="single-icon" type="ghost">
    <Icon className="default-icon" component={<OptionHorizontalM />} />
    <Icon
      className="hover-icon"
      component={next ? <DoubleAngleRightS /> : <DoubleAngleLeftS />}
    />
  </Button>
);

const Pagination = ({
  current,
  defaultCurrent = 1,
  total = 0,
  pageSize,
  defaultPageSize = 10,
  onChange,
  showSizeChanger,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onShowSizeChange,
  showQuickJumper = false,
  showTotal,
  showLessItems = false,
  disabled = false,
  hideOnSinglePage = false,
  locale,
  className,
  style,
  // accepted for back-compat but intentionally not applied (DS renders its own controls)
  itemRender: _itemRender,
  ...rest
}: PaginationProps) => {
  const isCurrentControlled = current !== undefined;
  const isPageSizeControlled = pageSize !== undefined;

  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);

  const activePage = isCurrentControlled
    ? (current as number)
    : internalCurrent;
  const activePageSize = isPageSizeControlled
    ? (pageSize as number)
    : internalPageSize;

  const totalPages = Math.max(1, Math.ceil(total / activePageSize));
  // antd parity: when `showSizeChanger` is not set, the size changer auto-shows once `total`
  // exceeds antd's `totalBoundaryShowSizeChanger` (50). An explicit boolean always wins.
  const sizeChangerVisible = showSizeChanger ?? total > 50;
  const [jumperValue, setJumperValue] = useState('');

  const goToPage = useCallback(
    (page: number): void => {
      const next = Math.min(Math.max(page, 1), totalPages);
      if (next === activePage) {
        return;
      }
      if (!isCurrentControlled) {
        setInternalCurrent(next);
      }
      onChange?.(next, activePageSize);
    },
    [activePage, activePageSize, isCurrentControlled, onChange, totalPages],
  );

  const handleSizeChange = useCallback(
    (size: number): void => {
      const newTotalPages = Math.max(1, Math.ceil(total / size));
      const nextPage = Math.min(activePage, newTotalPages);
      if (!isPageSizeControlled) {
        setInternalPageSize(size);
      }
      if (!isCurrentControlled) {
        setInternalCurrent(nextPage);
      }
      onShowSizeChange?.(nextPage, size);
      onChange?.(nextPage, size);
    },
    [
      activePage,
      isCurrentControlled,
      isPageSizeControlled,
      onChange,
      onShowSizeChange,
      total,
    ],
  );

  const handleJump = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key !== 'Enter') {
      return;
    }
    const parsed = Number(jumperValue);
    if (!Number.isNaN(parsed) && parsed > 0) {
      goToPage(parsed);
    }
    setJumperValue('');
  };

  const pages = useMemo(
    () => getPages(activePage, totalPages, showLessItems),
    [activePage, totalPages, showLessItems],
  );

  if (hideOnSinglePage && totalPages <= 1) {
    return null;
  }

  const jumpSize = getJumpSize(showLessItems);
  const prevDisabled = disabled || activePage <= 1;
  const nextDisabled = disabled || activePage >= totalPages;
  const rangeFrom = total === 0 ? 0 : (activePage - 1) * activePageSize + 1;
  const rangeTo = Math.min(activePage * activePageSize, total);

  return (
    <S.Root className="ds-pagination" style={style} {...rest}>
      {showTotal && (
        <S.TotalText className="ds-pagination-total-text">
          {showTotal(total, [rangeFrom, rangeTo])}
        </S.TotalText>
      )}

      <S.Nav
        className="ds-pagination-prev"
        $side="prev"
        $disabled={prevDisabled}
        onClick={() => !prevDisabled && goToPage(activePage - 1)}
      >
        <NavIcon component={<AngleLeftS />} />
      </S.Nav>

      {pages.map((item, index) => {
        if (item === 'jump-prev' || item === 'jump-next') {
          const isNext = item === 'jump-next';
          return (
            <S.Jump
              key={`${item}-${index}`}
              className={`ds-pagination-${item}`}
              onClick={() =>
                goToPage(isNext ? activePage + jumpSize : activePage - jumpSize)
              }
            >
              <JumpButton next={isNext} />
            </S.Jump>
          );
        }
        return (
          <S.Item
            key={item}
            className={`ds-pagination-item ds-pagination-item-${item}${
              item === activePage ? ' ds-pagination-item-active' : ''
            }`}
            $active={item === activePage}
            onClick={() => goToPage(item)}
          >
            <a role="button">{item}</a>
          </S.Item>
        );
      })}

      <S.Nav
        className="ds-pagination-next"
        $side="next"
        $disabled={nextDisabled}
        onClick={() => !nextDisabled && goToPage(activePage + 1)}
      >
        <NavIcon component={<AngleRightS />} />
      </S.Nav>

      {(sizeChangerVisible || showQuickJumper) && (
        <S.Options className="ds-pagination-options">
          {sizeChangerVisible && (
            <S.SizeChanger className="ds-pagination-options-size-changer">
              <Select
                value={activePageSize}
                disabled={disabled}
                onChange={(value) => handleSizeChange(Number(value))}
              >
                {pageSizeOptions.map((option: string | number) => (
                  <Select.Option key={option} value={Number(option)}>
                    {option}
                    {locale?.items_per_page ?? ' / page'}
                  </Select.Option>
                ))}
              </Select>
            </S.SizeChanger>
          )}
          {showQuickJumper && (
            <S.QuickJumper className="ds-pagination-options-quick-jumper">
              {locale?.jump_to ?? 'Go to'}
              <S.JumperInput
                type="text"
                disabled={disabled}
                value={jumperValue}
                onChange={(event) => setJumperValue(event.target.value)}
                onKeyDown={handleJump}
              />
              {locale?.page}
            </S.QuickJumper>
          )}
        </S.Options>
      )}
    </S.Root>
  );
};

export default Pagination;
