import { Button } from "@mantine/core";
import { useRef } from "react";
import { Editor } from "./Editor";
import { nodes } from "./mocks/nodes";
import { FlowType, NodeType } from "./models";

export default {
  title: "BPM Pro",
  component: Editor,
};

const initialNodes = [
  {
    id: "1",
    name: "开始",
    type: NodeType.START,
    subType: "bpm.start",
    options: { form: { id: "114514" } },
    canvasProps: { x: 250, y: 25 },
  },
  {
    id: "2",
    name: "结束",
    type: NodeType.END,
    subType: "bpm.end",
    options: {},
    canvasProps: { x: 350, y: 85 },
  },
  {
    id: "3",
    name: "审批",
    type: NodeType.APPROVE,
    subType: "bpm.approve",
    options: {},
    canvasProps: { x: 150, y: 85 },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    type: FlowType.CONDITION,
    name: "Some Flow",
    source: "1",
    target: "2",
    canvasProps: {},
    options: { conditionExpression: "a==1" },
  },
];

export const EditorStory = () => {
  const editorRef = useRef<any>(null);
  return (
    <div
      style={{
        width: "100%",
        height: "98vh",
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
      />
    </div>
  );
};

EditorStory.displayName = "BPM Pro Editor (React Flow)";
