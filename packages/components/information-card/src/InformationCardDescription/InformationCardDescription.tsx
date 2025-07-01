import React, { type ReactNode, useState } from 'react';

import SubtleForm from '@synerise/ds-subtle-form';
import { type SubtleTextAreaProps } from '@synerise/ds-subtle-form/dist/Elements/TextArea/TextArea.types';

import * as S from '../InformationCard.styles';

type InformationCardDescriptionProps = {
  extraInformation?: ReactNode;
  descriptionConfig?: SubtleTextAreaProps | string | null;
};

export const InformationCardDescription = ({
  extraInformation = undefined,
  descriptionConfig,
}: InformationCardDescriptionProps) => {
  const [description, setDescription] = useState<string>('');
  const renderDescription = () => {
    if (descriptionConfig) {
      return typeof descriptionConfig === 'string' ? (
        <S.NonEditableWrapper>{descriptionConfig}</S.NonEditableWrapper>
      ) : (
        <SubtleForm.TextArea
          minRows={1}
          value={description}
          onChange={(value) => {
            descriptionConfig.onChange && descriptionConfig.onChange(value);
            setDescription(value);
          }}
          placeholder="placeholder"
          suffixTooltip="Edit"
          {...descriptionConfig}
          // {...(descriptionConfig.error
          //   ? {
          //       error: descriptionConfig.error,
          //       errorText: (isError: boolean, text: string) => (isError ? text : ''),
          //     }
          //   : {})}
          disabled={descriptionConfig.disabled}
        />
      );
    }
    return <></>;
  };
  return (
    <S.DescriptionWrapper data-testid="information-card-description">
      <S.AlertWrapper>{extraInformation}</S.AlertWrapper>
      {descriptionConfig && renderDescription()}
    </S.DescriptionWrapper>
  );
};
