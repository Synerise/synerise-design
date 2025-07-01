import { createContext } from 'react';

import { type SubMenuContextType } from './SubMenuContext.types';

const SubMenuContext = createContext<SubMenuContextType>(undefined);

export default SubMenuContext;
