import dayjs from 'dayjs';
// Explicit `.js` — dayjs 1.11 ships no `exports` map, so Node's ESM resolver does no extension
// guessing and rejects the bare subpath outright. The Vite build passes specifiers through verbatim.
import relativeTimePlugin from 'dayjs/plugin/relativeTime.js';
import utcPlugin from 'dayjs/plugin/utc.js';
import React from 'react';

import { UserAvatar } from '@synerise/ds-avatar';

import * as S from './ItemMeta.styles';
import { type Props } from './ItemMeta.types';

// Registered here rather than relying on ds-core extending the same shared dayjs instance: that
// works today only as a side effect of module evaluation order in another package.
dayjs.extend(utcPlugin);
dayjs.extend(relativeTimePlugin);

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
        <S.ItemMetaCreated>{dayjs.utc(created).fromNow()}</S.ItemMetaCreated>
      )}
      {user && <UserAvatar size="small" user={userData} />}
    </S.ItemMeta>
  );
};

export default ItemMeta;
