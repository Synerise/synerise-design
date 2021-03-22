import React, { useRef, useEffect } from 'react';
import {
  InputM,
  TextAreaM,
  SwitchM,
  RadioButtonM,
  CheckboxM,
  SelectMenuM,
  FileUploadM,
  ButtonM,
  TransformM,
} from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { NOOP } from '@synerise/ds-utils';
import { ItemProps } from '../Item.types';

import Actions from '../../Actions';
import * as S from '../Item.styles';

export type BaseComponentProps = ItemProps & {
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export const BaseComponent: React.FC<BaseComponentProps> = ({
  icon: IconComponent,
  item,
  // onVisibleChange = NOOP,
  editMode = false,
  onDelete = NOOP,
  onCopy = NOOP,
  onPaste = NOOP,
  onCut = NOOP,
  onDuplicate = NOOP,
  onEditMode = NOOP,
  onEditModeChange = NOOP,
  onSelected = NOOP,
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editMode && inputRef.current) inputRef.current.focus();
  }, [editMode]);

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      onEditModeChange(event);
      onEditMode(false);
    }
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    onEditModeChange(event);
    onEditMode(false);
  };

  const onVisibleChange = (visible: boolean): void => {
    onSelected(visible);
  };

  const onEdit = (): void => {
    onEditMode(true);
    onVisibleChange(false);
  };

  const suffixel = !editMode ? (
    <S.SuffixWrapper>
      <Actions
        item={item}
        texts={restProps.texts}
        onVisibleChange={onVisibleChange}
        onDelete={onDelete}
        onCopy={onCopy}
        onCut={onCut}
        onDuplicate={onDuplicate}
        onPaste={onPaste}
        onEdit={onEdit}
      />
    </S.SuffixWrapper>
  ) : (
    undefined
  );

  return (
    <S.Item
      suffixel={suffixel}
      prefixel={
        <>
          <Icon />
          <Icon component={<IconComponent />} size="24" />
        </>
      }
      {...restProps}
    >
      {editMode ? (
        <S.InlineEditWrapper>
          <S.InlineEditInput
            defaultValue={item.model.name}
            ref={inputRef}
            onBlur={handleOnBlur}
            onKeyDown={handleOnKeyDown}
          />
        </S.InlineEditWrapper>
      ) : (
        item.model.name
      )}
    </S.Item>
  );
};

export const TextField: React.FC<ItemProps> = props => {
  return <BaseComponent icon={InputM} {...props} />;
};

export const TextArea: React.FC<ItemProps> = props => {
  return <BaseComponent icon={TextAreaM} {...props} />;
};

export const Relation: React.FC<ItemProps> = props => {
  return <BaseComponent icon={TransformM} {...props} />;
};

export const Switch: React.FC<ItemProps> = props => {
  return <BaseComponent icon={SwitchM} {...props} />;
};

export const RadioButton: React.FC<ItemProps> = props => {
  return <BaseComponent icon={RadioButtonM} {...props} />;
};

export const CheckBox: React.FC<ItemProps> = props => {
  return <BaseComponent icon={CheckboxM} {...props} />;
};

export const Select: React.FC<ItemProps> = props => {
  return <BaseComponent icon={SelectMenuM} {...props} />;
};

export const Upload: React.FC<ItemProps> = props => {
  return <BaseComponent icon={FileUploadM} {...props} />;
};

export const Button: React.FC<ItemProps> = props => {
  return <BaseComponent icon={ButtonM} {...props} />;
};
