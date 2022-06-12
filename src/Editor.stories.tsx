import { Button } from '@mantine/core';
import { useRef } from 'react';
import { Editor } from './Editor';
import { nodes } from './mocks/nodes';
import { FlowType, NodeType } from './models';

export default {
  title: 'BPM Pro',
  component: Editor,
};

const initialNodes = [
  {
    id: '1',
    name: '开始',
    type: NodeType.START,
    subType: 'bpm.start',
    options: { form: { id: '114514' } },
    canvasProps: { x: 250, y: 25 },
  },
  {
    id: '2',
    name: '结束',
    type: NodeType.END,
    subType: 'bpm.end',
    options: {},
    canvasProps: { x: 350, y: 85 },
  },
  {
    id: '3',
    name: '审批',
    type: NodeType.APPROVE,
    subType: 'bpm.approve',
    options: {},
    canvasProps: { x: 150, y: 85 },
  },
  {
    id: '4',
    name: '排他网关',
    type: NodeType.XOR_GATEWAY,
    subType: 'bpm.xor_gateway',
    options: {},
    canvasProps: { x: 450, y: 185 },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    type: FlowType.CONDITION,
    name: 'Some Flow',
    source: '1',
    target: '2',
    canvasProps: {},
    options: { conditionExpression: 'a==1' },
  },
];

export const EditorStory = () => {
  const editorRef = useRef<any>(null);
  return (
    <div
      style={{
        width: '100%',
        height: '98vh',
      }}
    >
      <div>
        <Button
          onClick={() => {
            editorRef.current && console.log(editorRef.current.getModel());
          }}
        >
          Get Model
        </Button>
      </div>
      <Editor
        ref={editorRef}
        nodes={nodes}
        flows={[]}
        model={{ nodes: initialNodes, flows: initialEdges }}
        groupCategories={[
          {
            id: 'terminus',
            name: '始终点',
            nodeList: ['bpm.start', 'bpm.end'],
          },
          {
            id: 'manual',
            name: '人工节点',
            nodeList: ['bpm.approve', 'bpm.input'],
          },
          {
            id: 'gateway',
            name: '网关',
            nodeList: ['bpm.xor_gateway'],
          },
        ]}
      />
    </div>
  );
};

EditorStory.displayName = 'BPM Pro Editor (React Flow)';
