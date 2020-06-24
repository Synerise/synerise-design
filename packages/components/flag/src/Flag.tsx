// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Flag from 'react-flagkit';
import * as React from 'react';

export type FlagProps = {
  country: string;
  size?: number;
  role?: string;
};
const DSFlag: React.FC<FlagProps> = ({ country, size = 20, role = 'img' }) => (
  <Flag className="ds-flag" country={country.toUpperCase()} size={size} role={role} />
);

export default DSFlag;
