import React, { useCallback } from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';
import AntPagination, { PaginationProps } from 'antd/lib/pagination';
import Button from '@synerise/ds-button';
import Icon, {
  AngleLeftS,
  AngleRightS,
  DoubleAngleLeftS,
  DoubleAngleRightS,
  OptionHorizontalM,
} from '@synerise/ds-icon';

const ITEM_RENDER_TYPE = {
  prev: 'prev',
  next: 'next',
  jumpPrev: 'jump-prev',
  jumpNext: 'jump-next',
};

type Arguments = Parameters<Required<PaginationProps>['itemRender']>;

const Pagination = ({ locale, ...props }: PaginationProps) => {
  const renderItem = useCallback((_current: Arguments[0], type: Arguments[1], originalElement: Arguments[2]) => {
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

  return <AntPagination {...props} locale={{ page: '', ...locale }} itemRender={renderItem} />;
};

export default Pagination;
