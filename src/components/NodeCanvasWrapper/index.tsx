import { Node as ReactFlowNode, Handle, Position } from "react-flow-renderer";
import { NodeType } from "../../models";
import { nodeCanvas } from "../../nodes";
export const NodeCanvasWrapper = (props: any) => {
  const Canvas = nodeCanvas[props.type as NodeType];
  return (
    <>
      <Handle position={Position.Left} type="target" />
      <Handle position={Position.Top} type="target" />
      <Canvas dataModel={props.data} />
      <Handle position={Position.Right} type="source" />
      <Handle position={Position.Bottom} type="source" />
    </>
  );
};
