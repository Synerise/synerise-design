import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip';

import * as S from './LabelsWithShowMore.styles';
import { Props } from './LabelsWithShowMore.types';
import DetailsModal from './Modal/Modal';

const LabelsWithShowMore: React.FC<Props<object>> = ({
  items,
  numberOfVisibleItems,
  tooltip,
  renderItem,
  labelKey,
  title,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const diff = React.useMemo(() => {
    return items.length - numberOfVisibleItems;
  }, [items, numberOfVisibleItems]);

  const labels = React.useMemo(() => {
    return items
      .slice(0, numberOfVisibleItems)
      .map(item => item[labelKey])
      .join(', ');
  }, [items, labelKey, numberOfVisibleItems]);

  return (
    <S.CellWrapper>
      <S.Labels>{labels}</S.Labels>
      {diff > 0 && (
        <Tooltip title={`${diff} ${tooltip}`}>
          <S.MoreInfo onClick={(): void => setModalVisible(true)}>+{diff}</S.MoreInfo>
        </Tooltip>
      )}
      <DetailsModal
        visible={modalVisible}
        hide={(): void => setModalVisible(false)}
        items={items}
        renderItem={renderItem}
        labelKey={labelKey}
        title={title}
      />
    </S.CellWrapper>
  );
};

export default LabelsWithShowMore;
