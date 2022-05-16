import { createContext } from "react";
import { NodeMapType } from "../models";

export interface RuntimeConfigContextType {
  nodeMap: NodeMapType;
}

export const RuntimeConfigContext = createContext<RuntimeConfigContextType>({
  nodeMap: {},
});
