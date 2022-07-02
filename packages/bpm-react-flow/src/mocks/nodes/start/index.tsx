import { NodePro, NodeType } from '../../../models'
import StartIcon from "./start.svg";

export const StartNode: NodePro<any> = {
  type: NodeType.START,
  subType: 'bpm.start',
  color: 'rgb(73, 137, 255)',
  name: '开始',
  defaultOptions: {},
  icon: <StartIcon />,
}
