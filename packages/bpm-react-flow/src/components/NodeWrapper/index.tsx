import React from 'react';
import { NodeHeader } from '@/components/NodeWrapper/Header';
import {
  Handle,
  NodeProps as RFNodeProps,
  Position,
} from 'react-flow-renderer';
import { isEndNode, isManualNode, isStartNode, rfNodePropsToNodeModel } from '@/utils';
import { useConfigContext } from '@/contexts/ConfigContext';

export const NodeWrapper = (props: RFNodeProps) => {
  const nodeModel = rfNodePropsToNodeModel(props);
  const showBackwardPort = isManualNode(props.type);
  const { nodeMap } = useConfigContext();
  const nodeDefinition = nodeMap[props.data.subType] || {};

  return (
    <>
      {!isStartNode(props.type) && <Handle position={Position.Top} type='target' id='inbound' />}
      {showBackwardPort && (
        <Handle
          type='target'
          position={Position.Right}
          id='backward-target'
          style={{ top: 16 }}
        />
      )}
      <div
        className='bpm-node-wrapper'
        style={{
          width: 136,
          height: 64,
          borderRadius: 4,
          background: '#fff',
          overflow: 'hidden',
          boxShadow: '2px 2px 4px 2px rgba(160, 160, 160, 0.5)',
        }}
      >
        <NodeHeader
          name={nodeModel.name}
          color={nodeDefinition.color || '#9AC8E2'}
          icon={nodeDefinition.icon}
        />
      </div>
      {showBackwardPort && (
        <Handle
          type='source'
          position={Position.Right}
          id='backward-source'
          style={{ top: 48 }}
        />
      )}
      {!isEndNode(props.type) && <Handle position={Position.Bottom} type='source' id='outbound' />}
    </>
  );
};
