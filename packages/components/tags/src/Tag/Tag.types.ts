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


export enum TagShape {
  SINGLE_CHARACTER_ROUND = 'single_character_round',
  SINGLE_CHARACTER_SQUARE = 'single_character_square',
  DEFAULT_ROUND = 'default_round',
  DEFAULT_SQUARE = 'default_square',
  SMALL_ROUND = 'small_round',
  SMALL_SQUARE = 'small_square',
  STATUS_NEUTRAL = 'status_custom',
  STATUS_SUCCESS = 'status_active',
  STATUS_ERROR = 'status_inactive',
  STATUS_WARNING = 'status_paused',
}
