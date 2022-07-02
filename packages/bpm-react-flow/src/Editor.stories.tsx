import { Button, Group } from '@mantine/core';
import { useRef } from 'react';
import { Editor } from './Editor';
import { nodes } from './mocks/nodes';
import { FlowType, NodeType } from './models';
import { flows } from '@/mocks/flows';

export default {
  title: 'BPM Pro',
  component: Editor,
};

class StorageHelper {
  static set(key: string, schema: any) {
    window.localStorage.setItem(key, JSON.stringify(schema));
  }
  static get(key: string) {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }
}

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

const initialEdges = [];

export const EditorStory = () => {
  const editorRef = useRef<any>(null);
  const model = StorageHelper.get('model') || {
    nodes: initialNodes,
    flows: initialEdges,
  };
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '98vh',
      }}
    >
      <Group
        style={{
          position: 'absolute',
          top: 16,
          left: 160,
          padding: 8,
          borderRadius: 8,
          zIndex: 99,
          background: '#fff',
          boxShadow: '2px 2px 8px 4px rgba(92,92,92,.25)',
        }}
      >
        <Button
          onClick={() => {
            editorRef.current && console.log(editorRef.current.getModel());
          }}
        >
          Log Model
        </Button>
        <Button
          onClick={() => {
            if (!editorRef.current) {
              return undefined;
            }
            const model = editorRef.current.getModel();
            StorageHelper.set('model', model);
          }}
        >
          Save Model
        </Button>
      </Group>
      <Editor
        ref={editorRef}
        nodes={nodes}
        flows={flows}
        model={model}
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
