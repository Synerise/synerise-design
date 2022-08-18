import { Input } from '@synerise/ds-input';
import Autocomplete from '@synerise/ds-autocomplete';
import * as React from 'react';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon, { Add3M } from '@synerise/ds-icon';
import Cruds from '@synerise/ds-cruds';
import { EditListProps } from './editable-list.types';
import * as S from './editable-list.styles';

const EditableList: React.FC<EditListProps> = ({
  leftColumnName,
  rightColumnName,
  autocompleteOptions,
  onChange,
  text,
  onSearch,
}) => {
  const [allParamsValues, setAllParamsValues] = React.useState([{ name: '', value: '' }]);
  const paramsWithNewValue = (id: number, name: string, value: string): { name: string; value: string }[] => {
    const updatedParams = [...allParamsValues];
    updatedParams[id] = { name, value };
    return updatedParams;
  };
  return (
    <div>
      {allParamsValues.map((param, id) => (
        // eslint-disable-next-line react/no-array-index-key
        <S.RowWrapper key={id}>
          <S.AutoCompleteWrapper>
            <Autocomplete
              style={{ width: 350 }}
              onSearch={onSearch}
              value={param.name}
              onChange={(paramName: string): void => {
                setAllParamsValues(paramsWithNewValue(id, paramName, param.value));
                if (onChange) onChange();
              }}
              label={id === 0 ? leftColumnName : null}
            >
              {autocompleteOptions}
            </Autocomplete>
          </S.AutoCompleteWrapper>
          <S.InputWrapper>
            <Input
              value={param.value}
              onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
                setAllParamsValues(paramsWithNewValue(id, param.name, ev.target.value));
                if (onChange) onChange();
              }}
              style={{ width: '300px' }}
              label={id === 0 ? rightColumnName : null}
            />
          </S.InputWrapper>
          <S.CrudWrapper marginWithLabel={id === 0 ? leftColumnName : null}>
            <Cruds
              onRemove={(): void =>
                setAllParamsValues([
                  ...allParamsValues.slice(0, id),
                  ...allParamsValues.slice(id + 1, allParamsValues.length),
                ])
              }
            />
          </S.CrudWrapper>
        </S.RowWrapper>
      ))}
      <S.ButtonWrapper>
        <S.AddButton
          onClick={(): void => setAllParamsValues(params => [...params, { name: '', value: '' }])}
          type="ghost-primary"
        >
          <S.AddIconWrapper>
            <Icon component={<Add3M />} size={24} color={theme.palette['blue-600']} />
          </S.AddIconWrapper>
          <span>{text}</span>
        </S.AddButton>
      </S.ButtonWrapper>
    </div>
  );
};
export default EditableList;
