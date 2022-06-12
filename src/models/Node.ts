import React from 'react';

export enum NodeType {
  START = 'START',
  END = 'END',
  TERMINATE_END = 'TERMINATE_END',
  APPROVE = 'APPROVE',
  INPUT = 'INPUT',
  SERVICE = 'SERVICE',
  OR_GATEWAY = 'OR_GATEWAY',
  XOR_GATEWAY = 'XOR_GATEWAY',
  CALL_ACTIVITY = 'CALL_ACTIVITY',
  SUB_PROCESS = 'SUB_PROCESS',
}

export interface NodeModelPro<T = any> {
  id: string;
  name: string;
  description?: string;
  type: NodeType;
  subType: string;
  options: T;
  canvasProps: {
    x: number;
    y: number;
  };
}

export interface NodePro<T = any> {
  type: NodeType;
  subType: string;
  name: string;
  icon?: string | React.ReactElement;
  color?: string;
  selectable?: boolean;
  defaultOptions: Partial<T>;
  Config?: React.ComponentType;
}

export interface NodeConfigProps<T = any> {
  dataModel: NodeModelPro<T>;
  onChange: (updates: Partial<NodeModelPro<T>>) => void;
}

export type NodeMapType = Record<string, NodePro>;
