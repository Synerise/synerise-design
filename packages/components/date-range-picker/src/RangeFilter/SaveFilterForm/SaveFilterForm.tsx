import * as React from 'react';
import Button from '@synerise/ds-button';
import { RawInput } from '@synerise/ds-input';
import Icon from '@synerise/ds-icon';
import { CheckM, CloseM } from '@synerise/ds-icon/dist/icons';
import { SaveFilterFormProps } from './SaveFilterForm.types';
import * as S from './SaveFilterForm.styles';

const SaveFilterForm: React.FC<SaveFilterFormProps> = ({onFilterSave}) => {
  const [active, setActive] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>();
  const input = (
    <>
      <RawInput
        placeholder="Filter name"
        value={name}
        onChange={(e): void => {
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
    <S.Container>
      {active ? (
        input
      ) : (
        <Button type="ghost" onClick={(): void => setActive(!active)}>
          {' '}
          Save filter
        </Button>
      )}
    </S.Container>
  );
};

export default SaveFilterForm;
