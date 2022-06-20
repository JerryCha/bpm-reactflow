import { createContext, useContext } from 'react';
import { NodeMapType } from '../models';
import { GroupCategories } from '@/Editor';

export interface ConfigContextType {
  nodeMap: NodeMapType;
  groupCategories?: GroupCategories[];
}

export const ConfigContext = createContext<ConfigContextType>({
  nodeMap: {},
  groupCategories: undefined,
});

export const useConfigContext = () => useContext(ConfigContext);
