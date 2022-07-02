import { NodePro, NodeType } from "@/models";
import XorIcon from "./xor.svg";

export const XorGatewayNode: NodePro = {
  type: NodeType.XOR_GATEWAY,
  subType: 'bpm.xor_gateway',
  name: '排他分支',
  defaultOptions: {},
  color: "#E799B0",
  icon: <XorIcon />
}