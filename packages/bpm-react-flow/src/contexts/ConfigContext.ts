import { createContext, useContext } from 'react';
import { FlowMapType, NodeMapType } from '../models';
import { GroupCategories } from '@/Editor';

export interface ConfigContextType {
  nodeMap: NodeMapType;
  flowMap: FlowMapType;
  groupCategories?: GroupCategories[];
}

export const ConfigContext = createContext<ConfigContextType>({
  nodeMap: {},
  flowMap: {},
  groupCategories: undefined,
});

export const useConfigContext = () => useContext(ConfigContext);
