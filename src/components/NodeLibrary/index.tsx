import { useConfigContext } from '@/contexts/ConfigContext';
import { map } from 'lodash-es';
import React, { DragEventHandler, useCallback, useMemo } from 'react';
import { NodeModelPro, NodeType } from '@/models';

interface NodeItem {
  type: NodeType;
  subType: string;
  name: string;
  icon?: React.ReactElement | string;
}

const NodeItem = (
  props: NodeItem & {
    onDrag: (event: any, data: string) => void;
  }
) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        border: '1px solid #EDF0F6',
        borderRadius: 8,
      }}
      draggable
      onDragStart={(event) => props.onDrag(event, props.subType)}
    >
      <div style={{ fontSize: 16 }}>{props.icon}</div>
      <div>{props.name}</div>
    </div>
  );
};

export const NodeLibrary = () => {
  const { nodeMap, groupCategories } = useConfigContext();

  const nodeGroups = useMemo(() => {
    if (!groupCategories) {
      const nodes = map(nodeMap, (val) => ({
        type: val.type,
        subType: val.subType,
        name: val.name,
        icon: val.icon || <span>{val.name[0]}</span>,
      }));
      return [{ id: 'default', name: '', nodes }];
    }
    return groupCategories.map((group) => {
      const nodes = group.nodeList
        .map((listItem) => nodeMap[listItem])
        .filter((node) => node);
      return {
        id: group.id,
        name: group.name,
        nodes: nodes.map((node) => ({
          type: node.type,
          subType: node.subType,
          name: node.name,
          icon: node.icon || <span>{node.name[0]}</span>,
        })),
      };
    });
  }, [nodeMap, groupCategories]);

  const onDrag = useCallback((event: any, subType: string) => {
    event.dataTransfer.setData('application/reactflow', subType);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 84,
        padding: 12,
        background: '#fff',
        boxShadow: '0px 2px 10px 0px rgba(9, 21, 40, 0.1)',
        position: 'absolute',
        left: 16,
        top: 16,
        zIndex: 99,
      }}
    >
      {nodeGroups.map((group, index) => {
        return (
          <React.Fragment key={group.id}>
            <div>
              {group.nodes.map((node) => (
                <NodeItem
                  key={`nodelib-item-${node.subType}`}
                  onDrag={onDrag}
                  {...node}
                />
              ))}
            </div>
            {index !== nodeGroups.length - 1 && <div>分割线</div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};
