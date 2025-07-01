import React, { useMemo, useState } from 'react';

import Tooltip from '@synerise/ds-tooltip';

import * as S from './LabelsWithShowMore.styles';
import { type LabelsWithShowMoreProps } from './LabelsWithShowMore.types';
import DetailsModal from './Modal/Modal';
import { type DataSourceType } from './Modal/Modal.types';

const LabelsWithShowMore = ({
  items,
  numberOfVisibleItems,
  renderItem,
  labelKey,
  texts,
  loading,
  ...htmlAttributes
}: LabelsWithShowMoreProps<DataSourceType>) => {
  const [modalVisible, setModalVisible] = useState(false);

  const diff = useMemo(() => {
    return items.length - numberOfVisibleItems;
  }, [items, numberOfVisibleItems]);

  const labels = useMemo(() => {
    return items
      .slice(0, numberOfVisibleItems)
      .map((item) => item[labelKey])
      .join(', ');
  }, [items, labelKey, numberOfVisibleItems]);

  return (
    <S.CellWrapper {...htmlAttributes}>
      <S.Labels>{labels}</S.Labels>
      {diff > 0 && (
        <Tooltip title={`${texts.tooltip}`}>
          <S.MoreInfo onClick={(): void => setModalVisible(true)}>
            +{diff}
          </S.MoreInfo>
        </Tooltip>
      )}
      <DetailsModal
        visible={modalVisible}
        hide={(): void => setModalVisible(false)}
        items={items}
        renderItem={renderItem}
        labelKey={labelKey}
        texts={texts}
        loading={loading}
      />
    </S.CellWrapper>
  );
};

export default LabelsWithShowMore;
