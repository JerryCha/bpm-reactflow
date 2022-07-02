import React, { useMemo } from 'react';
import { NodeHeader } from '@/components/NodeWrapper/Header';
import {
  Handle,
  NodeProps as RFNodeProps,
  Position,
} from 'react-flow-renderer';
import {
  isEndNode,
  isManualNode,
  isStartNode,
  rfNodePropsToNodeModel,
} from '@/utils';
import { useConfigContext } from '@/contexts/ConfigContext';
import { useRuntimeContext } from '@/contexts/RuntimeContext';
import tinycolor2 from 'tinycolor2';

const getShadowColor = (colorObj: tinycolor2.Instance) => {
  const hsv = colorObj.toHsv();
  return tinycolor2({ h: hsv.h, s: 25, v: 100, a: 0.25 });
};

export const NodeWrapper = (props: RFNodeProps) => {
  const nodeModel = rfNodePropsToNodeModel(props);
  const showBackwardPort = isManualNode(props.type);
  const { nodeMap } = useConfigContext();
  const nodeDefinition = nodeMap[props.data.subType] || {};
  const { selectedElement } = useRuntimeContext();
  const highlighted = useMemo(() => {
    return (
      !!selectedElement &&
      selectedElement.findIndex((element) => element.id === nodeModel.id) !== -1
    );
  }, [selectedElement]);
  // TODO: calculate the shadow color using tinycolor2
  const nodeColorObj = tinycolor2(nodeDefinition.color || '#fff');

  return (
    <>
      <div
        className='bpm-node-wrapper'
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: 136,
          height: 64,
          borderRadius: 8,
          // overflow: 'hidden',
          boxShadow: highlighted
            ? `1px 1px 8px 2px ${getShadowColor(nodeColorObj).toHexString()}`
            : '1px 1px 8px 2px rgba(192, 192, 192, 0.25)',
        }}
      >
        {highlighted && (
          <div
            className='node-ctx-panel'
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              left: 146,
              background: '#fff',
              width: 40,
              gap: 4,
              padding: 4,
              borderRadius: 4,
              boxShadow: '0px 2px 10px 0px rgba(9, 21, 40, 0.1)',
            }}
          >
            <span>🗑️</span>
          </div>
        )}
        <NodeHeader
          name={nodeModel.name}
          color={nodeDefinition.color || '#9AC8E2'}
          icon={nodeDefinition.icon}
        />
        <div
          style={{ flex: 1, background: '#fff', borderRadius: '0 0 8px 8px' }}
        >
          1234
        </div>
      </div>
      {!isStartNode(props.type) && (
        <Handle position={Position.Top} type='target' id='inbound' />
      )}
      {showBackwardPort && (
        <Handle
          type='target'
          position={Position.Right}
          id='backward-target'
          style={{ top: 16 }}
        />
      )}
      {showBackwardPort && (
        <Handle
          type='source'
          position={Position.Right}
          id='backward-source'
          style={{ top: 48 }}
        />
      )}
      {!isEndNode(props.type) && (
        <Handle position={Position.Bottom} type='source' id='outbound' />
      )}
    </>
  );
};
