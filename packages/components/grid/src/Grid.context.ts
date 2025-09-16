import { createContext } from 'react';

export const GridContext = createContext({
  dimensions: { width: window.innerWidth, height: window.innerHeight },
});
