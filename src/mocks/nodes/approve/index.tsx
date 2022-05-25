import { NodePro, NodeType } from '../../../models'
import ApproveIconn, {ReactComponent as ApproveIcon} from './approve.svg?svgr';

console.log(ApproveIcon, ApproveIconn, <ApproveIconn />)

export const ApproveNode: NodePro<any> = {
  type: NodeType.APPROVE,
  subType: 'bpm.approve',
  color: 'rgb(255, 100, 100)',
  name: '审批',
  defaultOptions: {},
  icon: <ApproveIconn />,
}
