import { useContext } from "react";
import { ConfigContext } from "../contexts/ConfigContext";

export const useNodeMap = () => { 
  const configRuntime = useContext(ConfigContext);
  return configRuntime.nodeMap; 
}