import {
  FolderAddM,
  InputM,
  TextAreaM,
  TransformM,
  SwitchM,
  RadioButtonM,
  CheckboxM,
  SelectMenuM,
  FileUploadM,
  ButtonM,
} from '@synerise/ds-icon';

import { ItemProps } from '@synerise/ds-treemenu/dist/Elements/Item/Item.types';

import Folder from '../../../../components/treemenu/src/Elements/Item/Items/Folder';
import { BaseComponent } from '../../../../components/treemenu/src/Elements/Item/Items/Elements';

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

const itemTypes = {
  folder: {
    name: 'Folder',
    component: Folder,
    icon: FolderAddM,
  },
  text: {
    name: 'Text field',
    component: TextField,
    icon: InputM,
  },
  textArea: {
    name: 'Text area',
    component: TextArea,
    icon: TextAreaM,
  },
  relation: {
    name: 'Relation',
    component: Relation,
    icon: TransformM,
  },
  switch: {
    name: 'Switch',
    component: Switch,
    icon: SwitchM,
  },
  radio: {
    name: 'Radio Button',
    component: RadioButton,
    icon: RadioButtonM,
  },
  checkbox: {
    name: 'Checkbox',
    component: CheckBox,
    icon: CheckboxM,
  },
  select: {
    name: 'Select',
    component: Select,
    icon: SelectMenuM,
  },
  upload: {
    name: 'Upload file',
    component: Upload,
    icon: FileUploadM,
  },
  button: {
    name: 'Button',
    component: Button,
    icon: ButtonM,
  },
};

export default itemTypes;
