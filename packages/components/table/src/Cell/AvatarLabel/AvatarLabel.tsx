import * as React from 'react';
import * as S from './AvatarLabel.styles';

type Props = {
  avatar: React.ReactElement;
  title: string | React.ReactNode;
  labels?: (string | React.ReactNode)[];
  icon?: React.ReactElement;
  textSize?: 'small' | 'default';
};

const AvatarLabel: React.FC<Props> = ({ avatar, title, labels, icon, textSize = 'default' }) => {
  return (
    <S.AvatarLabel>
      {icon && <S.Icon>{icon}</S.Icon>}
      <S.Avatar>{avatar}</S.Avatar>
      <S.Description>
        <S.Title withLabels={Boolean(labels?.length)} textSize={textSize}>
          {title}
        </S.Title>
        {labels?.map(
          (label: string | React.ReactNode): React.ReactElement => (
            <S.Label key={label as string} textSize={textSize}>
              {label}
            </S.Label>
          )
        )}
      </S.Description>
    </S.AvatarLabel>
  );
};

export default AvatarLabel;
