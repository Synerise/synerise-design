import * as React from 'react';
import Button from '@synerise/ds-button';
import * as S from './ColumnManagerActions.styles';

const ColumnManagerActions: React.FC = () => {
  return (
    <S.ColumnManagerActions>
      <Button type="secondary" mode="simple">
        Save view
      </Button>
      <S.RightButtons>
        <Button type="ghost" mode="simple">
          Cancel
        </Button>
        <Button type="primary" mode="simple">
          Apply
        </Button>
      </S.RightButtons>
    </S.ColumnManagerActions>
  );
};

export default ColumnManagerActions;
