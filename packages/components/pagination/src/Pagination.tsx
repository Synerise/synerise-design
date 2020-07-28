import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntPagination, { PaginationProps } from 'antd/lib/pagination';
import Icon from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import { AngleLeftS, AngleRightS } from '@synerise/ds-icon/dist/icons';

const ITEM_RENDER_TYPE = {
  prev: 'prev',
  next: 'next',
};

const Pagination: React.FC<PaginationProps> = props => {
  const renderItem = React.useCallback((current, type, originalElement) => {
    if (type === ITEM_RENDER_TYPE.prev) {
      return (
        <Button mode="single-icon" type="ghost">
          <Icon component={<AngleLeftS />} />
        </Button>
      );
    }
    if (type === ITEM_RENDER_TYPE.next) {
      return (
        <Button mode="single-icon" type="ghost">
          <Icon component={<AngleRightS />} />
        </Button>
      );
    }
    return originalElement;
  }, []);

  return <AntPagination {...props} itemRender={renderItem} />;
};

export default Pagination;
