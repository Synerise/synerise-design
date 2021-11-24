import * as React from 'react';
import { v4 as uuid } from 'uuid';
import * as S from './AvatarLabel.styles';
import { Props } from './AvatarLabel.types';

const AvatarLabel: React.FC<Props> = ({
  avatar,
  avatarAction,
  title,
  labels,
  icon,
  textSize = 'default',
  ellipsis,
  maxWidth,
  avatarSize,
  loader,
}) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    <S.AvatarLabel onClick={avatarAction}>
      {icon && <S.Icon>{icon}</S.Icon>}
      <S.Avatar clickable={Boolean(avatarAction)}>{avatar}</S.Avatar>
      <S.Description>
        <S.Title ellipsis={Boolean(ellipsis)} maxWidth={maxWidth} avatarSize={avatarSize}>
          {title}
        </S.Title>
        {labels?.map(
          (label: string | React.ReactNode): React.ReactElement => (
            <S.Label key={uuid()} textSize={textSize} ellipsis={Boolean(ellipsis)} maxWidth={maxWidth}>
              {label}
            </S.Label>
          )
        )}
        {loader && <S.Loader>{loader}</S.Loader>}
      </S.Description>
    </S.AvatarLabel>
  );
};

export default AvatarLabel;
