import { useNodeDefinition } from '@/hooks'
import { NodeModelPro } from '@/models'

export const StartEndNode = (props: { dataModel: NodeModelPro }) => {
  const { dataModel } = props
  const { name } = dataModel
  // use node definition to get color, icon
  const { color, icon = <></> } = useNodeDefinition(dataModel)
  return (
    <div
      style={{
        width: 108,
        height: 36,
        padding: '0 8px',
        display: 'flex',
        boxSizing: 'border-box',
        alignItems: 'center',
        backgroundColor: color ?? '#9AC8E2',
        borderRadius: 16,
      }}
    >
      <span style={{ marginRight: 4 }}>{icon}</span>
      <span>{name}</span>
    </div>
  )
}
