import { NodeModelPro } from "../models";
import { useNodeMap } from "./useNodeMap";

export const useNodeDefinition = (nodeModel: NodeModelPro) => {
  const { subType } = nodeModel;
  const nodeMap = useNodeMap();
  return nodeMap[subType];
}