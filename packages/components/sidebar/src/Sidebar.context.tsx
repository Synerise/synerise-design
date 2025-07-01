import React from 'react';

import { type SidebarContextType } from './Sidebar.types';

export const SidebarContext = React.createContext<
  SidebarContextType | undefined
>(undefined);

export default SidebarContext;
