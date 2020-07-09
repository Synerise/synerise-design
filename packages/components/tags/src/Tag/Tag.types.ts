import { TagShape } from './Tag';

export interface Props {
  id?: string | number;
  name?: string;
  textColor?: string;
  color?: string;
  image?: string;
  shape?: TagShape;
  removable?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  onRemove?: (tag: string | number) => void;
  prefixel?: React.ReactNode | React.ReactText;
  suffixel?: React.ReactNode | React.ReactText;
}
