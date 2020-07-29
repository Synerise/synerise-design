import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntPagination, { PaginationProps } from 'antd/lib/pagination';
import Icon from '@synerise/ds-icon';
import Button from '@synerise/ds-button';
import {
  AngleLeftS,
  AngleRightS,
  DoubleAngleLeftS,
  DoubleAngleRightS,
  OptionHorizontalM,
} from '@synerise/ds-icon/dist/icons';

const ITEM_RENDER_TYPE = {
  prev: 'prev',
  next: 'next',
  jumpPrev: 'jump-prev',
  jumpNext: 'jump-next',
};

const Pagination: React.FC<PaginationProps> = props => {
  const renderItem = React.useCallback((current, type, originalElement) => {
    switch (type) {
      case ITEM_RENDER_TYPE.prev: {
        return (
          <Button mode="single-icon" type="ghost">
            <Icon component={<AngleLeftS />} />
          </Button>
        );
      }
      case ITEM_RENDER_TYPE.next: {
        return (
          <Button mode="single-icon" type="ghost">
            <Icon component={<AngleRightS />} />
          </Button>
        );
      }
      case ITEM_RENDER_TYPE.jumpPrev: {
        return (
          <Button mode="single-icon" type="ghost">
            <Icon className="default-icon" component={<OptionHorizontalM />} />
            <Icon className="hover-icon" component={<DoubleAngleLeftS />} />
          </Button>
        );
      }
      case ITEM_RENDER_TYPE.jumpNext: {
        return (
          <Button mode="single-icon" type="ghost">
            <Icon className="default-icon" component={<OptionHorizontalM />} />
            <Icon className="hover-icon" component={<DoubleAngleRightS />} />
          </Button>
        );
      }
      default: {
        return originalElement;
      }
    }
  }, []);

  return <AntPagination {...props} itemRender={renderItem} />;
};

export default Pagination;
