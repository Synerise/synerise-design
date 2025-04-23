import type { IconProps } from '../Icon.types';

export type MimeTypeIconsProps = Omit<IconProps, 'component'> & {
  type: string;
};
