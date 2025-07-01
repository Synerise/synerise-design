import React from 'react';

import InlineEdit from '@synerise/ds-inline-edit/';

import type { PageHeaderProps } from '../PageHeader.types';
import * as S from './PageHeaderInlineEdit.styles';

type PageHeaderInlineEditProps = Required<Pick<PageHeaderProps, 'inlineEdit'>>;

export const PageHeaderInlineEdit = ({
  inlineEdit,
}: PageHeaderInlineEditProps) => {
  return (
    <S.WrapperPageHeaderInlineEdit>
      <InlineEdit
        input={{
          name: inlineEdit.name,
          value: inlineEdit.value,
          maxLength: inlineEdit.maxLength,
          onChange: inlineEdit.handleOnChange,
          onBlur: inlineEdit.handleOnBlur,
          onEnterPress: inlineEdit.handleOnEnterPress,
          placeholder: inlineEdit.placeholder,
        }}
        size={inlineEdit.size}
        error={inlineEdit.error}
        disabled={inlineEdit.disabled}
        hideIcon={inlineEdit.hideIcon}
        customIcon={inlineEdit.customIcon}
        style={inlineEdit.style}
      />
    </S.WrapperPageHeaderInlineEdit>
  );
};
