import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Icon from '@synerise/ds-icon';
import * as S from './Cruds.styles';

type SingleCrudProps = {
  title: React.ReactNode | string;
  className: string;
  onClick: () => void;
  icon: React.ReactNode;
};

const SingleCrud: React.FC<SingleCrudProps> = ({ title, className, onClick, icon }) => {
  return (
    <Tooltip title={title}>
      <S.IconWrapper className={className} onClick={onClick}>
        <Icon component={icon} />
      </S.IconWrapper>
    </Tooltip>
  );
};
export default SingleCrud;
