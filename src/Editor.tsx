import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  ReactFlowInstance,
} from "react-flow-renderer";
import { RuntimeConfigContext } from "./contexts/RuntimeConfigContext";
import { FlowPro, NodePro, NodeType, ProcessModel } from "./models";
import { createNodeMap } from "./utils/node";
import { NodeCanvasWrapper } from "./components/NodeCanvasWrapper";
import { toProcessModel, toRFEdge, toRFNode } from "./utils";

interface EditorProps {
  model?: ProcessModel;
  nodes: NodePro[];
  flows: FlowPro[];
}

interface EditorRef {
  getModel: () => any;
  setModel: (model: ProcessModel) => void;
  validate: () => Promise<ProcessModel>;
}

export const Editor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  const {
    model: inputModel = { nodes: [], flows: [] },
    nodes = [],
    flows = [],
  } = props;

  const [nodeModel, setNodeModel] = useState(inputModel.nodes.map(toRFNode));
  const [flowModel, setFlowModel] = useState(inputModel.flows.map(toRFEdge));

  const configRuntime = useMemo(() => {
    return {
      nodeMap: createNodeMap(nodes),
    };
  }, [nodes]);

  const rfInstance = useRef<ReactFlowInstance>();

  useImperativeHandle(
    ref,
    () => ({
      getModel: (convert = true) => {
        return convert
          ? toProcessModel(nodeModel, flowModel)
          : { nodes: nodeModel, flows: flowModel };
      },
      setModel: (model) => {
        if (!rfInstance.current) {
          return;
        }
        const rfNodes = model.nodes.map(toRFNode);
        const rfEdges = model.flows.map(toRFEdge);
        rfInstance.current.setNodes(rfNodes);
        rfInstance.current.setEdges(rfEdges);
      },
      validate: () => Promise.resolve(toProcessModel(nodeModel, flowModel)),
    }),
    [nodeModel, flowModel, rfInstance]
  );

  const onNodeChange = (changes: NodeChange[]) => {
    console.log("node change", changes);
    setNodeModel((nds: any[]) => applyNodeChanges(changes, nds));
  };
  const onEdgeChange = (changes: EdgeChange[]) => {
    console.log("flow change", changes);
    setFlowModel((eds: any[]) => applyEdgeChanges(changes, eds));
  };

  const onConnect = (connection: any) => {
    console.log(connection);
    setFlowModel((eds: any) => addEdge(connection, eds));
  };

  const nodeTypes = useMemo(
    () => ({
      [NodeType.START]: NodeCanvasWrapper,
      [NodeType.END]: NodeCanvasWrapper,
    }),
    []
  );

  return (
    <RuntimeConfigContext.Provider value={configRuntime}>
      <ReactFlow
        nodes={nodeModel}
        edges={flowModel}
        onInit={(instance) => (rfInstance.current = instance)}
        onNodesChange={onNodeChange}
        onEdgesChange={onEdgeChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      />
    </RuntimeConfigContext.Provider>
  );
});
