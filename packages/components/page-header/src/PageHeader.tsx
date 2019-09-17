import * as React from 'react';
import * as S from './PageHeader.style';

export type PageHeaderProps = {
  rightSide?: React.ReactNode;
  children?: React.ReactNode;
  postTitle?: React.ReactNode | string;
  title: React.ReactNode | string;
  onGoBack?: () => void;
  backLabel?: string;
};

const PageHeader: React.FC<PageHeaderProps> = props => {
  const { backLabel, children, onGoBack, postTitle, rightSide, title } = props;
  return (
    <S.MainContainer>
      <S.PageHeaderContainer>
        <S.PageHeaderTitle>
          {title}
          {postTitle}
          {onGoBack && <S.BackButton onClick={onGoBack}>{backLabel}</S.BackButton>}
        </S.PageHeaderTitle>
        <S.PageHeaderContent>{rightSide}</S.PageHeaderContent>
      </S.PageHeaderContainer>
      {children}
    </S.MainContainer>
  );
};

PageHeader.defaultProps = {
  backLabel: 'Back',
};

export default PageHeader;
