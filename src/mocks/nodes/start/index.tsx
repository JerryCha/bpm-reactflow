import { NodePro, NodeType } from '../../../models'

export const StartNode: NodePro<any> = {
  type: NodeType.START,
  subType: 'bpm.start',
  color: 'blue',
  name: '开始',
  defaultOptions: {},
  icon: (
    <div
      style={{
        width: 16,
        height: 16,
        background: 'transparent',
        borderRadius: "50%",
        border: '2px solid #FFF',
      }}
    ></div>
  ),
}
