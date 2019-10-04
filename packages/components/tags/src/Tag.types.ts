import { TagShape } from './Tag';

export interface Props {
  key?: string | number;
  name: string;
  textColor: string;
  color: string;
  shape: TagShape;
}
