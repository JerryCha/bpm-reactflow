import { NodeType } from '@bpm/type';
import { Editor } from '.';

export default {
  title: 'BPM Editor Next',
  component: Editor,
};

const sample = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40,       // Number，必选，节点位置的 x 值
      y: 40,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'START', // String，节点标签
      type: NodeType.START,
      subType: 'bpm.start'
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'APPROVE', // String，节点标签
      type: NodeType.APPROVE,
      subType: 'bpm.approve'
    },
    {
      id: 'node3', // String，节点的唯一标识
      x: 320,      // Number，必选，节点位置的 x 值
      y: 360,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: 'END', // String，节点标签
      type: NodeType.END,
      subType: 'bpm.end'
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
    },
    {
      source: 'node2',
      target: 'node3'
    }
  ],
}

export const EditorStory = () => {
  return <Editor model={sample} />;
};

EditorStory.displayName = 'BPM Editor@Next'
