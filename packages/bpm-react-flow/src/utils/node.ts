import { NodeMapType, NodePro, NodeType } from '../models';
import { nanoid } from 'nanoid';

export const createNodeMap = (nodes: NodePro[]) => {
  return nodes.reduce<NodeMapType>((m, node) => {
    m[node.subType] = node;
    return m;
  }, {});
};

export const getDefaultNodeModel = (node: NodePro) => {
  return {
    id: nanoid(),
    type: node.type,
    subType: node.subType,
    name: node.name,
    canvasProps: { x: 0, y: 0 },
    options: node.defaultOptions || {},
  };
};

export const isManualNode = (type: string) => {
  return [NodeType.APPROVE, NodeType.INPUT].includes(type as NodeType);
};
