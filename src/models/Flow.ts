import { NodeModelPro } from "./Node";

export enum FlowType {
  CONDITION = 'CONDITION'
}

export interface FlowModelPro<T = any> {
  id: string;
  source: string;
  target: string;
  name: string;
  canvasProps: {};
  options: T;
}

export interface FlowPro<T = any> {
  type: FlowType;
  defaultOptions?: Partial<T>;
}

export interface FlowConfigProps<T> {
  dataModel: FlowModelPro<T>;
  source: NodeModelPro;
  target: NodeModelPro;
  onChange: (updates: Partial<FlowModelPro<T>>) => void;
}