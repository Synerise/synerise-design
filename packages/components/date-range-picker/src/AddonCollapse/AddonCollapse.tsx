import * as React from 'react';
import Button from '@synerise/ds-button';
import * as S from './AddonCollapse.styles';
import { Props } from './AddonCollapse.types';

const AddonCollapse: React.FC<Props> = ({ title, content, expanded, onCollapseChange, collapsedSummary }: Props) => {
  const handleClick = (): void => {
    onCollapseChange && onCollapseChange(!expanded);
  };
  return (
    <S.AddonWrapper expanded={expanded}>
      <S.AddonHeader onClick={handleClick}>
        <S.Title>{title}</S.Title>
        {!expanded && <S.Suffix>{collapsedSummary}</S.Suffix>}
        <Button.Expander onClick={handleClick} expanded={expanded} />
      </S.AddonHeader>

      <S.Content expanded={expanded}>{content}</S.Content>
    </S.AddonWrapper>
  );
};

export default AddonCollapse;
