import { NodeModelPro } from '@/models'
import { useNodeDefinition } from '@/hooks'

export const ManualNode = (props: { dataModel: NodeModelPro }) => {
  const { dataModel } = props
  const { name } = dataModel
  const { color, icon = <></> } = useNodeDefinition(dataModel)
  return (
    <div
      style={{
        display: 'grid',
        width: 136,
        height: 88,
        gridTemplateRows: '16px auto',
        gap: 8,
        boxSizing: 'border-box',
        border: `1px solid ${color}`,
        background: "#FFF",
        borderRadius: 8,
        padding: 8,
      }}
    >
      <div className="icon-row">
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="name-row">{name}</div>
    </div>
  )
}
