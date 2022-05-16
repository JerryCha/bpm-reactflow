import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import ReactFlow, {
  Handle,
  Position,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
} from "react-flow-renderer";
import { RuntimeConfigContext } from "./contexts/RuntimeConfigContext";
import { FlowPro, NodePro, NodeType, ProcessModel } from "./models";
import { createNodeMap } from "./utils/node";
import { nodeCanvas } from "./nodes";
import { NodeCanvasWrapper } from "./components/NodeCanvasWrapper";

interface EditorProps {
  model?: ProcessModel;
  // nodes: NodePro[];
  // flows: FlowPro[];
  originalModel: any;
}

interface EditorRef {
  getModel: () => any;
}

const GatewayNode = (props: any) => {
  console.log("Gateway props", props);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        style={{
          width: 128,
          height: 32,
          padding: 32,
          background: "#9AC8E2",
          borderRadius: 16,
        }}
      >
        114514
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  const {
    model: inputModel = { nodes: [], flows: [] },
    // nodes,
    // flows,
    originalModel,
  } = props;
  const [nodeModel, setNodeModel] = useState(originalModel.nodes);
  const [flowModel, setFlowModel] = useState(originalModel.flows);

  // const configRuntime = useMemo(() => {
  //   return {
  //     nodeMap: createNodeMap(nodes),
  //   };
  // }, [nodes]);

  useImperativeHandle(
    ref,
    () => ({
      getModel: () => ({ nodes: nodeModel, flows: flowModel }),
    }),
    [nodeModel, flowModel]
  );

  const onNodeChange = (changes: NodeChange[]) => {
    console.log("node change", changes);
    setNodeModel((nds: any[]) => applyNodeChanges(changes, nds));
  };
  const onEdgeChange = (...args: any) => {
    console.log(args);
  };

  const onConnect = (connection: any) => {
    console.log(connection);
    setFlowModel((eds: any) => addEdge(connection, eds));
  };

  const nodeTypes = useMemo(
    () => ({
      Gateway: GatewayNode,
      [NodeType.START]: NodeCanvasWrapper,
    }),
    []
  );

  return (
    <ReactFlow
      nodes={nodeModel}
      edges={flowModel}
      onNodesChange={onNodeChange}
      onEdgesChange={onEdgeChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    />
  );
});
