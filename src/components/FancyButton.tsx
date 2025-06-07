/*
 * @Descripttion: 
 * @version: 
 * @Author: panyingxia
 * @Date: 2025-06-07 16:03:31
 * @LastEditors: panyingxia
 * @LastEditTime: 2025-06-07 16:35:43
 */
import React from 'react';

interface FancyButtonProps {
  icon?: React.ReactNode;
  variant?: 'solid' | 'outline';
  onClick?: () => void;
  children?: React.ReactNode;
}

const FancyButton: React.FC<FancyButtonProps> = ({ icon, variant = 'solid', onClick, children }) => {
  const isSolid = variant === 'solid';
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 28px',
        height: '48px',
        borderRadius: '24px',
        border: isSolid ? 'none' : '2px solid #ff168b',
        background: isSolid ? '#ff168b' : '#fff',
        color: isSolid ? '#fff' : '#ff168b',
        fontWeight: 600,
        fontSize: '18px',
        boxShadow: isSolid ? '0 2px 8px rgba(255,22,139,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
        cursor: 'pointer',
        outline: 'none',
        transition: 'all 0.2s',
        borderWidth: isSolid ? 0 : 2,
      }}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center', fontSize: '22px' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default FancyButton; 