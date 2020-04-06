import './index.css';
import * as React from 'react';
import { DSProvider } from '@synerise/ds-core/dist/js';

interface Props {
  children: React.ReactChild;
}

const Wrapper: React.FC<Props> = ({ children }: Props) => <DSProvider>{children}</DSProvider>;

export default Wrapper;
