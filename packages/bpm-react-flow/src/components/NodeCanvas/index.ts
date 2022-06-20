import { NodeType } from "../../models";
import { GatewayNode } from "./Gateway";
import { ManualNode } from "./Manual";
import { StartEndNode } from "./StartEnd";

export const nodeCanvas: Record<string, any> = {
  [NodeType.START]: StartEndNode,
  [NodeType.END]: StartEndNode,
  [NodeType.APPROVE]: ManualNode,
  [NodeType.INPUT]: ManualNode,
  [NodeType.XOR_GATEWAY]: GatewayNode,
  [NodeType.OR_GATEWAY]: GatewayNode
};
