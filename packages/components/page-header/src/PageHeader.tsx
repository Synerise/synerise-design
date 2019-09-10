import * as React from 'react';
import * as S from './PageHeader.style';

export type PageHeaderProps = {
  rightSide?: React.ReactNode;
  children?: React.ReactNode;
  postTitle?: React.ReactNode | string;
  title: string;
  onGoBack?: () => void;
  backLabel?: string;
};

class PageHeader extends React.Component<PageHeaderProps> {
  static defaultProps = {
    backLabel: 'Back',
  };

  render() {
    const { backLabel, children, onGoBack, postTitle, rightSide, title } = this.props;
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
  }
}

export default PageHeader;
