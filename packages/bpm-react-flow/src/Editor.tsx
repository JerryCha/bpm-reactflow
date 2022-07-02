import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge as RFEdge,
  EdgeChange,
  MarkerType,
  Node as RFNode,
  NodeChange,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from 'react-flow-renderer';
import { ConfigContext } from './contexts/ConfigContext';
import { FlowPro, FlowType, NodePro, NodeType, ProcessModel } from './models';
import {
  createNodeMap,
  getDefaultNodeModel,
  isGatewayNode,
  isManualNode,
} from './utils/node';
// import { NodeCanvasWrapper } from './components/NodeCanvasWrapper';
import { NodeWrapper as NodeCanvasWrapper } from '@/components/NodeWrapper';
import {
  FloatingConnectionLine,
  FloatingEdge,
  toProcessModel,
  toRFEdge,
  toRFNode,
} from '@/utils';
import { NodeLibrary } from '@/components/NodeLibrary';
import { PropertiesPanel } from '@/components/PropertiesPanel';
import { RuntimeContext } from './contexts/RuntimeContext';
import { createFlowMap } from '@/utils/flow';

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

  // const [nodeModel, setNodeModel] = useState(inputModel.nodes.map(toRFNode));
  // const [flowModel, setFlowModel] = useState(inputModel.flows.map(toRFEdge));
  const [nodeModel, setNodeModel, onNodesChange] = useNodesState(
    inputModel.nodes.map(toRFNode)
  );
  const [flowModel, setFlowModel, onEdgesChange] = useEdgesState(
    inputModel.flows.map(toRFEdge)
  );

  const nodeMap = useMemo(() => createNodeMap(nodes), [nodes]);
  const flowMap = useMemo(() => createFlowMap(flows), [flows]);

  const configRuntime = useMemo(() => {
    return {
      nodeMap,
      flowMap,
      groupCategories,
    };
  }, [nodeMap, flowMap, groupCategories]);

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

  // const onNodeChange = (changes: NodeChange[]) => {
  //   setNodeModel((nds: any[]) => applyNodeChanges(changes, nds));
  // };
  // const onEdgeChange = (changes: EdgeChange[]) => {
  //   setFlowModel((eds: any[]) => applyEdgeChanges(changes, eds));
  // };

  const onConnect = (connection: any) => {
    setFlowModel((eds: any) => {
      console.log('connection', connection, nodeModel);
      const { data, source, target, sourceHandle, targetHandle } = connection;
      const terminusNodes = nodeModel.filter(
        (node) => node.id === source || node.id === target
      );
      const from = terminusNodes.find((n) => n.id === source);
      const to = terminusNodes.find((n) => n.id === target);
      // Judge the flow direction to determine the flow type
      let flowType;
      if (isGatewayNode(from!.type!)) {
        flowType = FlowType.CONDITION;
      } else if (isManualNode(from!.type!)) {
        if (
          sourceHandle === 'backward-source' &&
          targetHandle === 'backward-target'
        ) {
          flowType = FlowType.BACKWARD;
        } else {
          return eds;
        }
      } else {
        flowType = FlowType.FORWARD;
      }

      return addEdge(
        {
          ...connection,
          data: {
            ...data,
            elementType: 'flow',
          },
          type: flowType,
          markerEnd: { type: MarkerType.Arrow },
        },
        eds
      );
    });
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

  // const edgeTypes = useMemo(
  //   () => ({
  //     [FlowType.FORWARD]: FloatingEdge,
  //     [FlowType.BACKWARD]: FloatingEdge,
  //     [FlowType.CONDITION]: FloatingEdge,
  //   }),
  //   []
  // );

  const [selectedElement, setSelectedElement] = useState<
    (RFNode | RFEdge)[] | null
  >(null);

  const onClick = useCallback((event: React.SyntheticEvent, element: any) => {
    console.log('event', event, 'element', element);
    setSelectedElement([element]);
  }, []);

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

  return (
    <ConfigContext.Provider value={configRuntime}>
      <RuntimeContext.Provider value={{ selectedElement }}>
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
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onNodeClick={onClick}
              onEdgeClick={onClick}
              onPaneClick={() => setSelectedElement(null)}
              onDragOver={onDragOver}
              onDrop={onDrop}
              fitView
              proOptions={{
                account: 'paid-custom',
                hideAttribution: true,
              }}
              // connectionLineComponent={FloatingConnectionLine}
              // edgeTypes={edgeTypes}
            >
              <NodeLibrary />
              {/*<MiniMap />*/}
              <Controls />
              <Background />
              <PropertiesPanel />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </RuntimeContext.Provider>
    </ConfigContext.Provider>
  );
});
