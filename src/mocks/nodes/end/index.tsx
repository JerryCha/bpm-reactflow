import { NodePro, NodeType } from '../../../models'

export const EndNode: NodePro<any> = {
  type: NodeType.END,
  subType: 'bpm.end',
  color: 'rgb(73, 137, 255)',
  name: '结束',
  defaultOptions: {},
  icon: (
    <div
      style={{
        boxSizing: 'border-box',
        width: 16,
        height: 16,
        background: 'transparent',
        borderRadius: '50%',
        border: '3px solid #FFF',
      }}
    >
    </div>
  ),
}
