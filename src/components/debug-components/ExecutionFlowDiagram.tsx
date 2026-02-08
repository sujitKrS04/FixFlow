"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { Play, AlertCircle, CheckCircle, GitBranch, Square } from "lucide-react";

interface FlowNode {
  id: string;
  label: string;
  type: "start" | "function" | "condition" | "error" | "end";
}

interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

interface ExecutionFlowDiagramProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  errorNodeId: string;
}

const nodeTypeConfig = {
  start: {
    icon: Play,
    color: "#00ffff",
    bg: "rgba(0, 255, 255, 0.1)",
  },
  function: {
    icon: Square,
    color: "#7c3aed",
    bg: "rgba(124, 58, 237, 0.1)",
  },
  condition: {
    icon: GitBranch,
    color: "#06b6d4",
    bg: "rgba(6, 182, 212, 0.1)",
  },
  error: {
    icon: AlertCircle,
    color: "#ff3366",
    bg: "rgba(255, 51, 102, 0.1)",
  },
  end: {
    icon: CheckCircle,
    color: "#00ff9f",
    bg: "rgba(0, 255, 159, 0.1)",
  },
};

const CustomNode = ({ data }: any) => {
  const config = nodeTypeConfig[data.type as keyof typeof nodeTypeConfig];
  const Icon = config.icon;
  const isError = data.id === data.errorNodeId;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`px-4 py-3 rounded-lg min-w-[150px] text-center border-2 ${
        isError ? "border-error animate-pulse" : "border-primary/30"
      }`}
      style={{
        backgroundColor: isError ? "rgba(255, 51, 102, 0.2)" : config.bg,
      }}
    >
      <div className="flex items-center justify-center gap-2 mb-1">
        <Icon
          size={16}
          style={{ color: isError ? "#ff3366" : config.color }}
        />
        <span className="text-xs font-semibold opacity-70 uppercase">
          {data.type}
        </span>
      </div>
      <div className="text-sm font-mono font-semibold">{data.label}</div>
    </motion.div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

export function ExecutionFlowDiagram({
  nodes,
  edges,
  errorNodeId,
}: ExecutionFlowDiagramProps) {
  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState([]);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    // Convert our nodes to ReactFlow format
    const reactFlowNodes: Node[] = nodes.map((node, index) => ({
      id: node.id,
      type: "custom",
      position: { x: 250, y: index * 120 },
      data: {
        ...node,
        errorNodeId,
      },
    }));

    // Convert our edges to ReactFlow format
    const reactFlowEdges: Edge[] = edges.map((edge) => ({
      id: `${edge.from}-${edge.to}`,
      source: edge.from,
      target: edge.to,
      label: edge.label,
      animated: true,
      style: { stroke: "#00ffff", strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#00ffff",
      },
    }));

    setFlowNodes(reactFlowNodes);
    setFlowEdges(reactFlowEdges);
  }, [nodes, edges, errorNodeId, setFlowNodes, setFlowEdges]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border border-primary/30 rounded-lg overflow-hidden bg-surface/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 border-b border-primary/20">
        <GitBranch size={16} className="text-primary" />
        <span className="text-sm font-semibold">Execution Flow</span>
      </div>

      <div style={{ height: "500px" }} className="bg-background/30">
        <ReactFlow
          nodes={flowNodes}
          edges={flowEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background color="var(--primary)" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </motion.div>
  );
}
