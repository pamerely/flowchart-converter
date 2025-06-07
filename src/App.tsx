import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { toPng } from 'html-to-image';
import CustomNode from './components/CustomNode';
import FancyButton from './components/FancyButton';

const nodeTypes = {
  custom: CustomNode,
};

// 渐变色ID
const GRADIENT_ID = 'edge-gradient';

const defaultEdgeOptions = {
  style: {
    stroke: `url(#${GRADIENT_ID})`,
    strokeWidth: 3,
    strokeDasharray: '8 6', // 虚线
  },
  animated: false,
  type: 'smoothstep',
};

const LightningIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
const SparkleIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
);

const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [inputText, setInputText] = useState('');

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const parseTextToFlow = () => {
    const steps = inputText.split('→').map((step) => step.trim());
    const newNodes: Node[] = steps.map((step, index) => ({
      id: `node-${index}`,
      data: { label: step },
      position: { x: 250, y: index * 120 },
      type: 'custom',
    }));

    const newEdges: Edge[] = steps.slice(0, -1).map((_, index) => ({
      id: `edge-${index}`,
      source: `node-${index}`,
      target: `node-${index + 1}`,
      type: 'smoothstep',
      animated: false,
      style: {
        stroke: `url(#${GRADIENT_ID})`,
        strokeWidth: 3,
        strokeDasharray: '8 6',
      },
    }));

    setNodes(newNodes);
    setEdges(newEdges);
  };

  const exportToPng = async () => {
    const element = document.querySelector('.react-flow');
    if (element instanceof HTMLElement) {
      try {
        const dataUrl = await toPng(element);
        const link = document.createElement('a');
        link.download = 'flowchart.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('导出失败:', error);
      }
    }
  };

  // 在 ReactFlow 组件内插入 SVG 渐变定义
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f8f9fa' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        style={{ background: '#f8f9fa' }}
      >
        {/* SVG 渐变定义 */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id={GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff168b" />
              <stop offset="100%" stopColor="#ff6fd8" />
            </linearGradient>
          </defs>
        </svg>
        <Background color="#eee" gap={16} />
        <Controls />
        <Panel position="top-left" style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入流程文本，用 → 分隔步骤"
            style={{
              width: '300px',
              height: '100px',
              marginBottom: '15px',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #ddd',
              fontSize: '14px',
              resize: 'none',
            }}
          />
          <div style={{ display: 'flex', gap: '16px' }}>
            <FancyButton icon={LightningIcon} variant="solid" onClick={parseTextToFlow}>
              生成流程图
            </FancyButton>
            <FancyButton icon={SparkleIcon} variant="outline" onClick={exportToPng}>
              导出PNG
            </FancyButton>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default App; 