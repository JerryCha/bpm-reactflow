import { FlowModelPro } from "./Flow";
import { NodeModelPro } from "./Node";

export interface ProcessModel {
  nodes: NodeModelPro[];
  flows: FlowModelPro[];
}
