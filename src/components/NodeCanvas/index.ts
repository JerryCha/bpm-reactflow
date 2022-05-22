import { NodeType } from "../../models";
import { ManualNode } from "./Manual";
import { StartEndNode } from "./StartEnd";

export const nodeCanvas: Record<string, any> = {
  [NodeType.START]: StartEndNode,
  [NodeType.END]: StartEndNode,
  [NodeType.APPROVE]: ManualNode,
  [NodeType.INPUT]: ManualNode
};
