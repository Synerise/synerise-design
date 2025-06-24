import React from 'react';
import Icon, { SearchM } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';

import * as S from '../../Search.styles';
import { SearchButtonProps } from './SearchButton.types';

const SearchButton: React.FC<SearchButtonProps> = ({
  inputOpen,
  hidden,
  onClick,
  inputFocused,
  clickable,
  disabled,
}: SearchButtonProps) => {
  return (
    <S.SearchButton
      isOpen={inputOpen}
      hidden={hidden}
      className="SearchButton"
      inputFocused={inputFocused}
      clickable={!disabled && clickable}
      onClick={onClick}
    >
      <Button
        mode="single-icon"
        type="ghost"
        disabled={disabled}
        className={inputOpen ? 'btn-search-open' : 'btn-search'}
        data-testid="btn"
      >
        <Icon component={<SearchM />} />
      </Button>
    </S.SearchButton>
  );
};

export default SearchButton;
