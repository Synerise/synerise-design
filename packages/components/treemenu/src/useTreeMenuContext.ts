import { useContext } from 'react';
import TreeMenuContext, { ContextValues } from './TreeMenuContext';

export default function useTreeMenuContext(): ContextValues {
  return useContext(TreeMenuContext) || {};
}
