import { NodeMapType, NodePro } from "../models";

export const createNodeMap = (nodes: NodePro[]) => {
  return nodes.reduce<NodeMapType>((m, node) => {
    m[node.subType] = node;
    return m;
  }, {});
};
