import { createContext } from "react";
import { NodeMapType } from "../models";

export interface ConfigContextType {
  nodeMap: NodeMapType;
}

export const ConfigContext = createContext<ConfigContextType>({
  nodeMap: {},
});
