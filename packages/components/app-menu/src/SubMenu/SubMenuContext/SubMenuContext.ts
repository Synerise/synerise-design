import { createContext } from 'react';
import { SubMenuContextType } from './SubMenuContext.types';

const SubMenuContext = createContext<SubMenuContextType>(undefined);

export default SubMenuContext;
