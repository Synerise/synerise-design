import * as React from 'react';
import Avatar from '@synerise/ds-avatar';
import * as moment from 'moment';
import getInitials from '@synerise/ds-utils/dist/getInitials/getInitials';
import * as S from './ItemMeta.styles';

interface Props {
  user?: {
    avatar_url?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
  };
  created?: string;
}

export const ItemMeta: React.FC<Props> = ({ user, created }: Props) => {
  const tooltipData = {
    name: `${user?.firstname ? user?.firstname : ''} ${user?.lastname ? user?.lastname : ''}`,
    email: user?.email ? user?.email : '',
  };

  return (
    <S.ItemMeta>
      {created && <S.ItemMetaCreated>{moment.utc(created).fromNow()}</S.ItemMetaCreated>}
      {user && (
        <Avatar tooltip={tooltipData} size="small" src={user.avatar_url} shape="circle">
          {getInitials(user.firstname, user.lastname)}
        </Avatar>
      )}
    </S.ItemMeta>
  );
};

export default ItemMeta;
