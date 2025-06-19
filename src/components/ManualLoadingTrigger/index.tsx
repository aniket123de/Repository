"use client";

import React from 'react';
import styled from 'styled-components';
import useLoadingControl from '~/hooks/useLoadingControl';

const ManualLoadingTrigger = () => {
  const { showLoading, startLoading, stopLoading } = useLoadingControl();

  const handleQuickLoad = () => {
    showLoading(1500); // Show for 1.5 seconds
  };

  const handleToggleLoad = () => {
    startLoading();
    // Auto-stop after 2 seconds for demo
    setTimeout(() => {
      stopLoading();
    }, 2000);
  };

  return (
    <StyledWrapper>
      <div className="loading-controls">
        <button onClick={handleQuickLoad} className="load-btn quick">
          Demo Loading
        </button>
        <button onClick={handleToggleLoad} className="load-btn toggle">
          Manual Loading
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  z-index: 1000;
  
  .loading-controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .load-btn {
    padding: 12px 16px;
    background: rgba(87, 185, 194, 0.9);
    border: 2px solid #57B9C2;
    border-radius: 8px;
    color: #000;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    font-family: var(--font-basement-grotesque, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);

    &:hover {
      background: #57B9C2;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(87, 185, 194, 0.4);
    }

    &:active {
      transform: translateY(0);
    }

    &.quick {
      background: rgba(255, 77, 0, 0.9);
      border-color: #ff4d00;
      
      &:hover {
        background: #ff4d00;
        box-shadow: 0 4px 12px rgba(255, 77, 0, 0.4);
      }
    }
  }

  @media (max-width: 768px) {
    bottom: 80px;
    right: 20px;
    
    .load-btn {
      padding: 10px 14px;
      font-size: 11px;
    }
  }
`;

export default ManualLoadingTrigger;
