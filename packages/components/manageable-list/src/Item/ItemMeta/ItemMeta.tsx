import moment from 'moment';
import React from 'react';

import { UserAvatar } from '@synerise/ds-avatar';

import * as S from './ItemMeta.styles';
import { type Props } from './ItemMeta.types';

export const ItemMeta: React.FC<Props> = ({ user, created }: Props) => {
  const {
    firstname: firstName,
    lastname: lastName,
    avatar_url: avatar,
    email,
  } = user || {};
  const userData = { firstName, lastName, avatar, email };

  return (
    <S.ItemMeta>
      {created && (
        <S.ItemMetaCreated>{moment.utc(created).fromNow()}</S.ItemMetaCreated>
      )}
      {user && <UserAvatar size="small" user={userData} />}
    </S.ItemMeta>
  );
};

export default ItemMeta;
