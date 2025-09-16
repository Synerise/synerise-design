import React from 'react';

import { SkeletonAvatar } from '@synerise/ds-skeleton';

import AvatarLabelCell from '../Cell/AvatarLabel/AvatarLabel';
import * as S from '../Table.styles';

export const DEFAULT_ROW_COUNT = 10;
export const HEADER_HEIGHT = 73;
export const SUBHEADER_HEIGHT = 64;
export const ROW_HEIGHT = 73;

export const SKELETON_BAR_TINY = 16;
export const SKELETON_BAR_STANDARD = 72;
export const SKELETON_BAR_WIDE = 100;
export const SKELETON_BAR_EXTRA_WIDE = 164;

export const getDefaultSkeletonColumns = (height = ROW_HEIGHT) => [
  {
    width: 350,
    title: (
      <div style={{ width: '100px' }}>
        <S.Skeleton numberOfSkeletons={1} width="M" />
      </div>
    ),
    render: () => (
      <S.TableSkeletonCell width="100%" height={height}>
        <AvatarLabelCell
          title={
            <div style={{ width: '100px' }}>
              <S.Skeleton numberOfSkeletons={1} width="M" />
            </div>
          }
          avatar={<SkeletonAvatar shape="square" size="M" />}
        />
      </S.TableSkeletonCell>
    ),
  },
  {
    minWidth: 100,
    title: '',
    render: () => <S.TableSkeletonCell height={height} />,
  },
  {
    width: 120,
    title: <S.Skeleton numberOfSkeletons={1} size="M" />,
    render: () => (
      <S.TableSkeletonCell width="100%" height={height}>
        <S.Skeleton numberOfSkeletons={1} size="M" />
      </S.TableSkeletonCell>
    ),
  },
  {
    width: 212,
    title: <S.Skeleton numberOfSkeletons={1} size="M" />,
    render: () => (
      <S.TableSkeletonCell width="100%" height={height}>
        <S.Skeleton numberOfSkeletons={1} size="M" />
      </S.TableSkeletonCell>
    ),
  },
  {
    width: 120,
    title: <S.Skeleton numberOfSkeletons={1} size="M" />,
    render: () => (
      <S.TableSkeletonCell width="100%" height={height}>
        <S.Skeleton numberOfSkeletons={1} size="M" />
      </S.TableSkeletonCell>
    ),
  },
];
