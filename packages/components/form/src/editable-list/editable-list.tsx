import { Input } from '@synerise/ds-input';
import Autocomplete from '@synerise/ds-autocomplete';
import * as React from 'react';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon, { Add3M } from '@synerise/ds-icon';
import Cruds from '@synerise/ds-cruds';
import { EditListProps, EditableParam } from './editable-list.types';
import * as S from './editable-list.styles';

export const EditableList: React.FC<EditListProps> = ({
  leftColumnName,
  rightColumnName,
  autocompleteOptions,
  value,
  onChange,
  textAddButton,
  onSearch,
  onClickAddRow,
  onClickDelete,
  renderAddButton,
  renderLeftColumn,
  renderRightColumn,
  renderAdditionalColumn,
  renderActions,
}) => {
  const [params, setParams] = React.useState<EditableParam[] | undefined>([]);
  const paramsWithNewValue = (id: number, name: string, newValue: string): { name: string; value: string }[] => {
    const updatedParams = [...(params || [])];
    updatedParams[id] = { name, value: newValue };
    return updatedParams;
  };
  React.useEffect(() => {
    setParams(value);
  }, [value]);

  const onSetParamsDefault = (): void => setParams(prevParams => [...(prevParams || []), { name: '', value: '' }]);

  return (
    <div>
      {params?.map((param, id) => (
        // eslint-disable-next-line react/no-array-index-key
        <S.RowWrapper key={id}>
          {renderLeftColumn?.(param, id) ?? (
            <S.AutoCompleteWrapper>
              <Autocomplete
                style={{ width: 350 }}
                onSearch={onSearch}
                value={param.name}
                onChange={(paramName: string): void => {
                  const newParams = paramsWithNewValue(id, paramName, param.value);
                  setParams(newParams);
                  if (onChange) onChange(newParams);
                }}
                label={id === 0 ? leftColumnName : null}
              >
                {autocompleteOptions}
              </Autocomplete>
            </S.AutoCompleteWrapper>
          )}
          {renderRightColumn?.(param, id) ?? (
            <S.InputWrapper>
              <Input
                value={param.value}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
                  const newParams = paramsWithNewValue(id, param.name, ev.target.value);
                  setParams(newParams);
                  if (onChange) onChange(newParams);
                }}
                style={{ width: '300px' }}
                label={id === 0 ? rightColumnName : null}
              />
            </S.InputWrapper>
          )}
          {renderAdditionalColumn?.()}
          {(typeof renderActions === 'function' && renderActions?.(param, id, params, { onClickDelete })) ||
            (renderActions === true && (
              <S.CrudWrapper marginWithLabel={id === 0 ? leftColumnName : null}>
                <Cruds
                  onRemove={(): void => {
                    const newParams = params ? [...params.slice(0, id), ...params.slice(id + 1, params.length)] : [];
                    if (onClickDelete) {
                      onClickDelete(param, id, newParams);
                    } else {
                      setParams(newParams);
                    }
                  }}
                />
              </S.CrudWrapper>
            )) ||
            undefined}
        </S.RowWrapper>
      ))}
      {renderAddButton?.() ?? (
        <S.ButtonWrapper>
          <S.AddButton onClick={onClickAddRow || onSetParamsDefault} type="ghost-primary">
            <S.AddIconWrapper>
              <Icon component={<Add3M />} size={24} color={theme.palette['blue-600']} />
            </S.AddIconWrapper>
            <span>{textAddButton}</span>
          </S.AddButton>
        </S.ButtonWrapper>
      )}
    </div>
  );
};
export default EditableList;
