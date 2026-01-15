import React, { type MouseEvent, type ReactNode } from 'react';
import { v4 as uuid } from 'uuid';

import * as S from './AvatarLabel.styles';
import { type AvatarLabelProps } from './AvatarLabel.types';

const AvatarLabel = ({
  avatar,
  avatarAction,
  avatarLink,
  title,
  labels,
  icon,
  ellipsis,
  maxWidth,
  avatarSize,
  loader,
  disabled,
  ...htmlAttributes
}: AvatarLabelProps) => {
  const titleEllipsisProps = ellipsis ? { ellipsis: { tooltip: title } } : {};

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey) {
      event.stopPropagation();
    } else if (avatarAction) {
      event.preventDefault();
    }
  };
  const cellContent = (
    <>
      {icon && <S.Icon>{icon}</S.Icon>}
      <S.Avatar clickable={Boolean(avatarAction)}>{avatar}</S.Avatar>
      <S.Description>
        <S.Title
          {...titleEllipsisProps}
          hasEllipsis={ellipsis}
          maxWidth={maxWidth}
          avatarSize={avatarSize}
        >
          {title}
        </S.Title>
        {labels && (
          <S.Labels ellipsis={Boolean(ellipsis)} maxWidth={maxWidth}>
            {labels?.map((label: string | ReactNode) => (
              <S.Label key={uuid()}>{label}</S.Label>
            ))}
          </S.Labels>
        )}
        {loader && <S.Loader>{loader}</S.Loader>}
      </S.Description>
    </>
  );

  return (
    <S.AvatarLabel
      {...htmlAttributes}
      isDisabled={disabled}
      onClick={avatarAction}
    >
      {avatarLink ? (
        <S.AvatarLink href={avatarLink} onClick={handleLinkClick}>
          {cellContent}
        </S.AvatarLink>
      ) : (
        cellContent
      )}
    </S.AvatarLabel>
  );
};

export default AvatarLabel;
