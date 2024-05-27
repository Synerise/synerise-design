import type { ReactNode } from 'react';

export type BackActionProps = {
  label: ReactNode;
  onClick: () => void;
};

// @deprecated - use BackActionProps instead
export type Props = BackActionProps;
