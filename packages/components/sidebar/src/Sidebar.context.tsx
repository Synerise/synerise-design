import * as React from 'react';
import { SidebarContextType } from './Sidebar.types';

export const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export default SidebarContext;
