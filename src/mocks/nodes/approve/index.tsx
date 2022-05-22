import { NodePro, NodeType } from '../../../models'
import ApproveIcon from './approve.svg'

export const ApproveNode: NodePro<any> = {
  type: NodeType.APPROVE,
  subType: 'bpm.approve',
  color: 'rgb(255, 100, 100)',
  name: '审批',
  defaultOptions: {},
  icon: (
    <div
      style={{
        display: 'flex',
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      1
    </div>
  ),
}
