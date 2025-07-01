import React from 'react';

import Button from '@synerise/ds-button';
import Icon, { CheckM, CloseM } from '@synerise/ds-icon';
import { RawInput } from '@synerise/ds-input';

import * as S from './SaveFilterForm.styles';
import { type SaveFilterFormProps } from './SaveFilterForm.types';

const SaveFilterForm: React.FC<SaveFilterFormProps> = ({
  texts,
  onFilterSave,
}) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>();

  const input = (
    <>
      <RawInput
        placeholder={texts.filterName}
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          setName(e.target.value);
        }}
      />
      <S.FormButton
        mode="single-icon"
        type="ghost"
        onClick={(): void => {
          setActive(false);
        }}
      >
        <Icon component={<CloseM />} />
      </S.FormButton>{' '}
      <S.FormButton
        mode="single-icon"
        type="custom-color-ghost"
        color="blue"
        onClick={(): void => {
          setActive(false);
          name && onFilterSave(name);
          setName('');
        }}
      >
        <Icon component={<CheckM />} />
      </S.FormButton>
    </>
  );
  return (
    <S.Container data-testid="drp-save-filter-form">
      {active ? (
        input
      ) : (
        <Button type="ghost" onClick={(): void => setActive(!active)}>
          {texts.saveFilter}
        </Button>
      )}
    </S.Container>
  );
};

export default SaveFilterForm;
