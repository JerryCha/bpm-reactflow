import { NodePro, NodeType } from '../../../models'
import EndIcon from "./end.svg";

export const EndNode: NodePro<any> = {
  type: NodeType.END,
  subType: 'bpm.end',
  color: 'rgb(73, 137, 255)',
  name: '结束',
  defaultOptions: {},
  icon: <EndIcon />
}
