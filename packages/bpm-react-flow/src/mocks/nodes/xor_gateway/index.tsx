import { NodePro, NodeType } from "@/models";

export const XorGatewayNode: NodePro = {
  type: NodeType.XOR_GATEWAY,
  subType: 'bpm.xor_gateway',
  name: '排他网关',
  defaultOptions: {},
  color: "#E799B0",
  icon: <div>X</div>
}