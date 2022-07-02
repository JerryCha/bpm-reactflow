import { NodeModelPro, NodePro } from './Node';
import { ComponentType } from 'react';

export enum FlowType {
  CONDITION = 'CONDITION',
  FORWARD = 'FORWARD',
  BACKWARD = 'BACKWARD',
}

export type FlowMapType = Record<string, FlowPro>;

export interface FlowModelPro<T = any> {
  id: string;
  type: FlowType;
  source: string;
  target: string;
  name: string;
  canvasProps: {
    [key: string]: any;
  };
  options: T;
}

export interface FlowPro<T = any> {
  type: FlowType;
  defaultOptions?: Partial<T>;
  Config?: ComponentType<FlowConfigProps<T>>;
}

export interface FlowConfigProps<T> {
  dataModel: FlowModelPro<T>;
  source: NodeModelPro;
  target: NodeModelPro;
  onChange: (updates: Partial<FlowModelPro<T>>) => void;
}
