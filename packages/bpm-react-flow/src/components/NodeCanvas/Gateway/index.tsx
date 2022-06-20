import { NodeModelPro } from '@/models'
import { useNodeDefinition } from '@/hooks'
import tinycolor2 from 'tinycolor2'

export const GatewayNode = (props: { dataModel: NodeModelPro }) => {
  const { dataModel } = props
  const { color, icon = <></> } = useNodeDefinition(dataModel)
  const colorObj = tinycolor2(color)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: 57,
        height: 57,
      }}
    >
      <div
        style={{
          position: 'absolute',
          zIndex: 1,
          width: 36,
          height: 36,
          transform: "rotate(45deg)",
          borderRadius: 6,
          backgroundColor: colorObj.lighten(20).desaturate(10).toHexString(),
          border: `1px dashed ${color}`
        }}
      />
      <span style={{ display: 'block', color, zIndex: 2 }}>{icon}</span>
    </div>
  )
}
