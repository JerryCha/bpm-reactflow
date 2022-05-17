import { useContext } from "react";
import { RuntimeConfigContext } from "../contexts/RuntimeConfigContext";

export const useNodeMap = () => { 
  const configRuntime = useContext(RuntimeConfigContext);
  return configRuntime.nodeMap; 
}