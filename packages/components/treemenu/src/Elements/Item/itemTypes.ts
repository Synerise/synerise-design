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
} from '@synerise/ds-icon/dist/icons';

import Folder from './Items/Folder';
import * as Elements from './Items/Elements';

const itemTypes = {
  folder: {
    name: 'Folder',
    component: Folder,
    icon: FolderAddM,
  },
  text: {
    name: 'Text field',
    component: Elements.TextField,
    icon: InputM,
  },
  textArea: {
    name: 'Text area',
    component: Elements.TextArea,
    icon: TextAreaM,
  },
  relation: {
    name: 'Relation',
    component: Elements.Relation,
    icon: TransformM,
  },
  switch: {
    name: 'Switch',
    component: Elements.Switch,
    icon: SwitchM,
  },
  radio: {
    name: 'Radio Button',
    component: Elements.RadioButton,
    icon: RadioButtonM,
  },
  checkbox: {
    name: 'Checkbox',
    component: Elements.CheckBox,
    icon: CheckboxM,
  },
  select: {
    name: 'Select',
    component: Elements.Select,
    icon: SelectMenuM,
  },
  upload: {
    name: 'Upload file',
    component: Elements.Upload,
    icon: FileUploadM,
  },
  button: {
    name: 'Button',
    component: Elements.Button,
    icon: ButtonM,
  },
};

export default itemTypes;
