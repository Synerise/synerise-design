import * as React from 'react';
import { v4 as uuid } from 'uuid';
import * as S from './AvatarLabel.styles';

type Props = {
  avatar: React.ReactElement;
  avatarAction?: () => void;
  title: string | React.ReactNode;
  labels?: (string | React.ReactNode)[];
  icon?: React.ReactElement;
  textSize?: 'small' | 'default';
  ellipsis?: boolean;
  maxWidth?: number;
};

const AvatarLabel: React.FC<Props> = ({
  avatar,
  avatarAction,
  title,
  labels,
  icon,
  textSize = 'default',
  ellipsis,
  maxWidth,
}) => {
  return (
    <S.AvatarLabel>
      {icon && <S.Icon>{icon}</S.Icon>}
      <S.Avatar onClick={avatarAction} clickable={Boolean(avatarAction)}>
        {avatar}
      </S.Avatar>
      <S.Description>
        <S.Title
          withLabels={Boolean(labels?.length)}
          textSize={textSize}
          ellipsis={Boolean(ellipsis)}
          maxWidth={maxWidth}
        >
          {title}
        </S.Title>
        {labels?.map(
          (label: string | React.ReactNode): React.ReactElement => (
            <S.Label key={uuid()} textSize={textSize} ellipsis={Boolean(ellipsis)} maxWidth={maxWidth}>
              {label}
            </S.Label>
          )
        )}
      </S.Description>
    </S.AvatarLabel>
  );
};

export default AvatarLabel;
