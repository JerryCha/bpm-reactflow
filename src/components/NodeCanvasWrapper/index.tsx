import { NodeProps as RFNodeProps, Handle, Position } from "react-flow-renderer";
import { toNodeModel } from "@/utils";
import { NodeType } from "@/models";
import { nodeCanvas } from "../NodeCanvas";
export const NodeCanvasWrapper = (props: RFNodeProps) => {
  const Canvas = nodeCanvas[props.type as NodeType];

  return (
    <>
      <Handle position={Position.Left} type="target" />
      <Handle position={Position.Top} type="target" />
      <Canvas dataModel={toNodeModel(props)} />
      <Handle position={Position.Right} type="source" />
      <Handle position={Position.Bottom} type="source" />
    </>
  );
};
