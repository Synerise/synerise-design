import * as React from 'react';
import Icon from '@synerise/ds-icon/dist/Icon';
import Button from '@synerise/ds-button';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import * as S from "../../Search.styles";

export type SearchButtonProps = {
  inputOpen: boolean;
  hidden: boolean;
  onClick: () => void;
  clickable? : boolean;
  inputFocused? : boolean;
};
const SearchButton: React.FC<SearchButtonProps> = ({inputOpen,hidden,onClick,inputFocused,clickable }: SearchButtonProps ) => {
  return (
    <S.SearchButton
      isOpen={inputOpen}
      hidden={hidden}
      className="SearchButton"
      inputFocused={inputFocused}
      clickable={clickable}
      onClick={onClick}
    >
      <Button
        type="ghost"
        className={inputOpen ? 'btn-search-open' : 'btn-search'}
        data-testid="btn"
      >
        <Icon component={<SearchM />} />
      </Button>
    </S.SearchButton>
  )
}

export default SearchButton;