import { Edge as RFEdge, Node as RFNode } from 'react-flow-renderer';
import { FlowModelPro, NodeModelPro } from '@/models';
import { NodeType, FlowType, ProcessModel } from '@/models';

export const toProcessModel = (
  rfNodes: RFNode[],
  rfEdges: RFEdge[]
): ProcessModel => {
  return {
    nodes: rfNodes.map(toNodeModel),
    flows: rfEdges.map(toFlowModel),
  };
};

export const toNodeModel = (rfNode: RFNode): NodeModelPro => {
  const { position, id, data, type } = rfNode;
  const { elementType, ...restData } = data;
  return {
    id,
    type: type as NodeType,
    ...restData,
    canvasProps: {
      ...position,
    },
  };
};

export const toFlowModel = (rfEdge: RFEdge): FlowModelPro => {
  const { id, source, target, data, sourceHandle, targetHandle } = rfEdge;
  const { elementType, ...restData } = data;
  return {
    id,
    type: FlowType.CONDITION,
    target,
    source,
    canvasProps: {
      sourceHandle,
      targetHandle,
    },
    ...restData,
  };
};

export const toRFNode = (nodeModel: NodeModelPro): RFNode => {
  const { id, type, canvasProps, ...rest } = nodeModel;
  return {
    id,
    type,
    position: { x: canvasProps.x, y: canvasProps.y },
    data: { ...rest, elementType: 'node' },
  };
};

export const toRFEdge = (flowModel: FlowModelPro): RFEdge => {
  const { id, source, target, canvasProps, ...rest } = flowModel;
  return {
    id,
    source,
    target,
    sourceHandle: canvasProps.sourceHandle,
    targetHandle: canvasProps.targetHandle,
    data: { ...rest, elementType: 'flow' },
  };
};
