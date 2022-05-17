import { NodeType } from "../../models";
import { StartNode } from "./start";

export const nodeCanvas: Record<string, any> = {
  [NodeType.START]: StartNode,
  [NodeType.END]: StartNode,
};
