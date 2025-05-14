import { Input } from '@synerise/ds-input';
import Autocomplete from '@synerise/ds-autocomplete';
import React from 'react';
import { theme } from '@synerise/ds-core';
import Icon, { Add3M } from '@synerise/ds-icon';
import Cruds from '@synerise/ds-cruds';
import { EditListProps, EditableParam } from './editable-list.types';
import * as S from './editable-list.styles';

const defaultFirstInputProps = {
  style: { width: 350 },
};

const defaultSecondInputProps = {
  style: { width: 300 },
};

export const EditableList: React.FC<EditListProps> = ({
  leftColumnName,
  rightColumnName,
  autocompleteOptions,
  value,
  onChange,
  addButtonConfig,
  onSearch,
  onClickDelete,
  renderAddButton,
  renderLeftColumn,
  renderRightColumn,
  renderAdditionalColumn,
  renderActions,
  validation,
  firstInputProps = defaultFirstInputProps,
  secondInputProps = defaultSecondInputProps,
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
                onSearch={onSearch}
                value={param.name}
                onChange={(paramName: string): void => {
                  const newParams = paramsWithNewValue(id, paramName, param.value);
                  setParams(newParams);
                  if (onChange) onChange(newParams);
                }}
                label={id === 0 ? leftColumnName : null}
                error={Boolean(validation?.validateLeftColumn?.(param.name))}
                errorText={validation?.validateLeftColumn?.(param.name)}
                {...firstInputProps}
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
                label={id === 0 ? rightColumnName : null}
                error={Boolean(validation?.validateRightColumn?.(param.value))}
                errorText={validation?.validateRightColumn?.(param.value)}
                {...secondInputProps}
              />
            </S.InputWrapper>
          )}
          {renderAdditionalColumn?.(params)}
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
      {renderAddButton?.(params) ?? (
        <S.ButtonWrapper>
          <S.AddButton
            onClick={addButtonConfig?.onClickAddRow || onSetParamsDefault}
            type="ghost-primary"
            disabled={addButtonConfig?.disableAddButton}
          >
            <S.AddIconWrapper>
              <Icon component={<Add3M />} size={24} color={theme.palette['blue-600']} />
            </S.AddIconWrapper>
            <span>{addButtonConfig?.textAddButton}</span>
          </S.AddButton>
        </S.ButtonWrapper>
      )}
    </div>
  );
};
export default EditableList;
