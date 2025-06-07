/*
 * @Descripttion: 
 * @version: 
 * @Author: panyingxia
 * @Date: 2025-06-07 15:59:22
 * @LastEditors: panyingxia
 * @LastEditTime: 2025-06-07 16:09:27
 */
import React, { useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

const THEME_COLOR = '#ff168b';
const GRADIENT = 'linear-gradient(90deg, #ff168b 0%, #ff6fd8 100%)';

const CustomNode: React.FC<NodeProps> = ({ data, id }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);
  const type = data.type || 'step'; // 'startend' | 'decision' | 'step'

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    data.label = label;
  }, [data, label]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        setIsEditing(false);
        data.label = label;
      }
    },
    [data, label]
  );

  // 渐变边框实现
  let borderRadius = type === 'startend' ? '24px/50%' : '12px';
  let minWidth = '140px';
  let minHeight = '60px';

  // 文字旋转还原
  const labelStyle: React.CSSProperties = type === 'decision' ? { transform: 'rotate(-45deg)', width: '100%', textAlign: 'center' } : {};

  return (
    <div
      style={{
        padding: 0,
        background: 'transparent',
        borderRadius,
        minWidth,
        minHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto',
        position: 'relative',
      }}
      onDoubleClick={handleDoubleClick}
    >
      {/* 渐变边框 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          borderRadius,
          padding: '3px',
          background: GRADIENT,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* 内部内容 */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: THEME_COLOR,
          borderRadius,
          minWidth,
          minHeight,
          color: '#fff',
          fontWeight: 'normal',
          fontSize: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Handle
          type="target"
          position={Position.Top}
          style={{
            width: '18px',
            height: '18px',
            background: '#fff',
            border: `4px solid ${THEME_COLOR}`,
            boxShadow: `0 0 0 2px #fff`,
            top: '-9px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
        {isEditing ? (
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{
              width: '100%',
              border: 'none',
              padding: '8px',
              textAlign: 'center',
              outline: 'none',
              background: 'transparent',
              fontSize: '16px',
              color: '#fff',
              fontWeight: 'normal',
            }}
          />
        ) : (
          <div style={{ fontWeight: 'normal', fontSize: '16px', ...labelStyle }}>{label}</div>
        )}
        <Handle
          type="source"
          position={Position.Bottom}
          style={{
            width: '18px',
            height: '18px',
            background: '#fff',
            border: `4px solid ${THEME_COLOR}`,
            boxShadow: `0 0 0 2px #fff`,
            bottom: '-9px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </div>
    </div>
  );
};

export default CustomNode; 