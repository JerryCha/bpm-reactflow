import { forwardRef, useState } from 'react'
import ReactFlow from 'react-flow-renderer'

interface EditorProps {
  model: {
    nodes: any[]
    flows: any[]
  }
}

export const Editor = forwardRef<any, EditorProps>((props, ref) => {
  const [model, setModel] = useState({
    nodes: props.model.nodes || [],
    flows: props.model.flows || [],
  })

  const onNodeChange = (...args: any) => {
    console.log(args)
  }
  const onEdgeChange = (...args: any) => {
    console.log(args)
  }

  return (
    <ReactFlow
      nodes={model.nodes || []}
      edges={model.flows}
      onNodesChange={onNodeChange}
      onEdgesChange={onEdgeChange}
    />
  )
})
