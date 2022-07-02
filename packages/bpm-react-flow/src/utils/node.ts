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

export const isEndNode = (type: string) => {
  return [NodeType.END, NodeType.TERMINATE_END].includes(type as NodeType);
};

export const isStartNode = (type: string) => {
  return [NodeType.START].includes(type as NodeType);
};

export const isGatewayNode = (type: string) => {
  return [NodeType.OR_GATEWAY, NodeType.XOR_GATEWAY].includes(type as NodeType);
};
