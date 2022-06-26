import React from 'react';
export declare enum NodeType {
    START = "START",
    END = "END",
    TERMINATE_END = "TERMINATE_END",
    APPROVE = "APPROVE",
    INPUT = "INPUT",
    SERVICE = "SERVICE",
    OR_GATEWAY = "OR_GATEWAY",
    XOR_GATEWAY = "XOR_GATEWAY",
    CALL_ACTIVITY = "CALL_ACTIVITY",
    SUB_PROCESS = "SUB_PROCESS"
}
export interface NodeModelPro<T = any> {
    id: string;
    name: string;
    description?: string;
    type: NodeType;
    subType: string;
    options: T;
    canvasProps: {
        x: number;
        y: number;
    };
}
export interface NodePro<T = any> {
    type: NodeType;
    subType: string;
    name: string;
    icon?: string | React.ReactElement;
    color?: string;
    selectable?: boolean;
    defaultOptions: Partial<T>;
    Config?: React.ComponentType<NodeConfigProps>;
}
export interface NodeConfigProps<T = any> {
    dataModel: NodeModelPro<T>;
    onChange: (updates: Partial<NodeModelPro<T>>) => void;
}
export declare type NodeMapType = Record<string, NodePro>;
export declare enum ACTION_TYPE_CODE {
    ONE_BY_ONE = "oneByOne",
    AND = "and",
    OR = "or",
    ONE = "one"
}
export declare type Assignment = {
    assignType: string;
    actionType: ACTION_TYPE_CODE;
    options?: Record<string, any>;
    fallback?: {
        type: string;
        options?: Record<string, any>;
    };
};
export declare type FormOptions = {
    id?: string;
};
export declare type BaseManualNodeOptions = {
    assignment: Assignment;
    form: FormOptions;
    nextNodeOptions?: {
        allowNextNodeAssigneeOverride?: boolean;
        nodeId?: string;
    };
    endProcessWhenReject?: boolean;
    addSign?: boolean;
    allowTransfer?: boolean;
    backward?: {
        enable: boolean;
        type: 'RERUN' | 'RETURN';
    };
    autoPassIfPassedBefore?: boolean;
    autoPassIfAssigneeIsStarter?: boolean;
};
