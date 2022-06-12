import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  ReactFlowInstance,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
} from 'react-flow-renderer';
import { ConfigContext } from './contexts/ConfigContext';
import { FlowPro, NodePro, NodeType, ProcessModel } from './models';
import { createNodeMap, getDefaultNodeModel } from './utils/node';
import { NodeCanvasWrapper } from './components/NodeCanvasWrapper';
import { toProcessModel, toRFEdge, toRFNode } from './utils';
import { NodeLibrary } from '@/components/NodeLibrary';
import { nanoid } from 'nanoid';

export interface GroupCategories {
  id: string;
  name: string;
  nodeList: string[];
}

interface EditorProps {
  model?: ProcessModel;
  nodes: NodePro[];
  flows: FlowPro[];
  groupCategories?: GroupCategories[];
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
    groupCategories,
  } = props;

  const [nodeModel, setNodeModel] = useState(inputModel.nodes.map(toRFNode));
  const [flowModel, setFlowModel] = useState(inputModel.flows.map(toRFEdge));

  const nodeMap = useMemo(() => createNodeMap(nodes), [nodes]);

  const configRuntime = useMemo(() => {
    return {
      nodeMap,
      groupCategories,
    };
  }, [nodeMap, groupCategories]);

  const [rfInstance, setRfInstance] = useState<ReactFlowInstance>();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      getModel: (convert = true) => {
        return convert
          ? toProcessModel(nodeModel, flowModel)
          : { nodes: nodeModel, flows: flowModel };
      },
      setModel: (model) => {
        if (!rfInstance) {
          return;
        }
        const rfNodes = model.nodes.map(toRFNode);
        const rfEdges = model.flows.map(toRFEdge);
        rfInstance.setNodes(rfNodes);
        rfInstance.setEdges(rfEdges);
      },
      validate: () => Promise.resolve(toProcessModel(nodeModel, flowModel)),
    }),
    [nodeModel, flowModel, rfInstance]
  );

  const onNodeChange = (changes: NodeChange[]) => {
    setNodeModel((nds: any[]) => applyNodeChanges(changes, nds));
  };
  const onEdgeChange = (changes: EdgeChange[]) => {
    setFlowModel((eds: any[]) => applyEdgeChanges(changes, eds));
  };

  const onConnect = (connection: any) => {
    setFlowModel((eds: any) => addEdge(connection, eds));
  };

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      console.log(event);
      event.preventDefault();
      if (!reactFlowWrapper.current || !rfInstance) {
        console.log(reactFlowWrapper, rfInstance);
        return;
      }
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const subType = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (!subType) {
        return;
      }

      const position = rfInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const node = nodeMap[subType];

      const newNode = {
        ...getDefaultNodeModel(node),
        canvasProps: { ...position },
      };

      setNodeModel((nds) => nds.concat(toRFNode(newNode)));
    },
    [nodeMap, rfInstance]
  );

  const nodeTypes = useMemo(
    () => ({
      [NodeType.START]: NodeCanvasWrapper,
      [NodeType.END]: NodeCanvasWrapper,
      [NodeType.TERMINATE_END]: NodeCanvasWrapper,
      [NodeType.APPROVE]: NodeCanvasWrapper,
      [NodeType.INPUT]: NodeCanvasWrapper,
      [NodeType.XOR_GATEWAY]: NodeCanvasWrapper,
      [NodeType.OR_GATEWAY]: NodeCanvasWrapper,
    }),
    []
  );

  const onClick = useCallback((_: React.SyntheticEvent, element: any) => {},
  []);

  return (
    <ConfigContext.Provider value={configRuntime}>
      <ReactFlowProvider>
        <div
          className='bpm bpm-editor-root'
          ref={reactFlowWrapper}
          style={{ width: '100%', height: '100%' }}
        >
          <ReactFlow
            nodes={nodeModel}
            edges={flowModel}
            onInit={(instance) => setRfInstance(instance)}
            onNodesChange={onNodeChange}
            onEdgesChange={onEdgeChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeClick={onClick}
            onEdgeClick={onClick}
            onDragOver={onDragOver}
            onDrop={onDrop}
            fitView
            proOptions={{
              account: 'paid-custom',
              hideAttribution: true,
            }}
          >
            <NodeLibrary />
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </ConfigContext.Provider>
  );
});
