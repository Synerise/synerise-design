import { TagShape } from './Tag';

export interface Props {
  key?: string | number;
  name?: string;
  textColor?: string;
  color?: string;
  image?: string;
  shape?: TagShape;
  removable?: boolean;
  className?: string;
  onRemove?: () => void;
}
