import { createContext, useContext } from 'react';
import { Node as RFNode, Edge as RFEdge } from 'react-flow-renderer';

export interface RuntimeContextType {
  selectedElement: (RFNode | RFEdge)[] | null;
}

export const RuntimeContext = createContext<RuntimeContextType>({
  selectedElement: null,
});

export const useRuntimeContext = () => useContext(RuntimeContext);
