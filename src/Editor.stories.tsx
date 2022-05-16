import { Button } from "@mantine/core";
import { useRef } from "react";
import { Editor } from "./Editor";

export default {
  title: "BPM Pro",
  component: Editor,
};

const initialNodes = [
  {
    id: "1",
    type: "START",
    data: { name: "Input Node" },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
  {
    id: "4",
    type: "Gateway",
    data: { label: "Gateway" },
    position: { x: 480, y: 140 },
  },
  {
    id: "5",
    type: "Gateway",
    data: { label: "Gateway" },
    position: { x: 480, y: 360 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
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
        // nodes={[]}
        // flows={[]}
        originalModel={{ nodes: initialNodes, flows: initialEdges }}
      />
    </div>
  );
};

EditorStory.displayName = "BPM Pro Editor (React Flow)";
