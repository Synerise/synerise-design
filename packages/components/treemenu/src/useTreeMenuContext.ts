import { useContext } from 'react';
import TreeMenuContext, { ContextValues } from './TreeMenuContext';

export default function useTreeMenuContext(): ContextValues | any {
  return useContext(TreeMenuContext) || {};
}
