import { NodeType } from "@bpm/types";

interface INodeGraphic {
  type: NodeType;
  width: number;
  height: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
  borderRadius?: number | string;
  shapeType: "rect" | "circle" | "diamond";
}

export class NodeGraphicStyleProvider {
  static getStyle(type: NodeType) {
    const styles: Record<string, INodeGraphic> = {
      [NodeType.START]: {
        type: NodeType.START,
        width: 60,
        height: 60,
        shapeType: "circle",
        strokeColor: "#3385FF",
        strokeWidth: 2
      },
      [NodeType.APPROVE]: {
        type: NodeType.APPROVE,
        width: 128,
        height: 64,
        shapeType: "rect",
        fillColor: "#fff",
        strokeColor: "#3385ff",
        strokeWidth: 1,
        borderRadius: 8
      },
      [NodeType.INPUT]: {
        type: NodeType.INPUT,
        width: 128,
        height: 64,
        shapeType: "rect",
        fillColor: "#fff",
        strokeColor: "#3385ff",
        strokeWidth: 1,
        borderRadius: 8
      },
      [NodeType.SERVICE]: {
        type: NodeType.SERVICE,
        width: 128,
        height: 64,
        shapeType: "rect",
        fillColor: "#fff",
        strokeColor: "#3385ff",
        strokeWidth: 1,
        borderRadius: 8
      },
      [NodeType.XOR_GATEWAY]: {
        type: NodeType.XOR_GATEWAY,
        width: 64,
        height: 64,
        shapeType: "diamond",
        fillColor: "#fff",
        strokeColor: "#3385ff",
        strokeWidth: 1,
      },
      [NodeType.OR_GATEWAY]: {
        type: NodeType.OR_GATEWAY,
        width: 64,
        height: 64,
        shapeType: "diamond",
        fillColor: "#fff",
        strokeColor: "#3385ff",
        strokeWidth: 1,
      },
      [NodeType.END]: {
        type: NodeType.END,
        width: 60,
        height: 60,
        shapeType: "circle",
        strokeColor: "#3385FF",
        strokeWidth: 2
      },
      [NodeType.TERMINATE_END]: {
        type: NodeType.TERMINATE_END,
        width: 60,
        height: 60,
        shapeType: "circle",
        strokeColor: "#3385FF",
        strokeWidth: 2
      }
    }
    return styles[type];
  }
}

export class NodeGraphicFactory {

  constructor() {
  }

  /**
   * 
   * @param type NodeType
   */
  getGraphicByType(type: any) { 
    
  }

}