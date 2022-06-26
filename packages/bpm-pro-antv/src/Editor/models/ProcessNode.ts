import { NodeModelPro, NodeType } from "@bpm/type";
import { Node } from "@antv/x6"
import { NODE_ORDER } from "../constants/GraphicOrder";

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

export class ProcessNode<T> extends Node {
  constructor(props: NodeModelPro) {
    const { id, type, subType, name, description, options, canvasProps } = props;
    super({
      id,
      size: {
        width: 0,
        height: 0
      },
      position: {
        x: canvasProps?.x ?? 0,
        y: canvasProps?.y ?? 0
      },
      zIndex: NODE_ORDER,
      data: {
        type,
        subType,
        name,
        description,
        options
      }
    })
  }

  static getGraphic(node: NodeModelPro) {
    const { type, name } = node;
    const styleConfig = styles[type];
    return {
      shape: styleConfig.shapeType === 'diamond' ? 'rect' : styleConfig.shapeType,
      attrs: {
        body: {
          fill: styleConfig.fillColor || "transparent",
          stroke: styleConfig.strokeColor,
        },
        label: {
          text: name,
          fill: "#000",
          fontSize: 14
        }
      }
    }
  }

  static getPorts(node: NodeModelPro) {
    const groups = {
      in: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#31d0c6',
            strokeWidth: 1,
            fill: '#fff'
          }
        }
      },
      outForward: {
        position: 'right',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#31d0c6',
            strokeWidth: 1,
            fill: '#fff'
          }
        }
      },
      outBackward: {}
    }
    switch (node.type) {
      case NodeType.APPROVE:
      case NodeType.INPUT:
        return []
      case NodeType.XOR_GATEWAY:
      case NodeType.OR_GATEWAY:
        return []
      case NodeType.START:
        return []
      case NodeType.END:
      case NodeType.TERMINATE_END:
        return []
      default:
        return []
    }
  }

  toNodeModel(): NodeModelPro {
    const data = this.data;
    const position = this.position();
    return {
      id: this.id,
      type: data.type,
      subType: data.subType,
      name: data.name,
      description: data.description,
      canvasProps: {
        x: position.x,
        y: position.y
      },
      options: data.options
    }
  }
}