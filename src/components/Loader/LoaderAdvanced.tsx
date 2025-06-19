"use client";

import React from 'react';
import styled from 'styled-components';

interface LoaderProps {
  message?: string;
  backgroundColor?: string;
  spinnerColor?: string;
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ 
  message = 'Loading...', 
  backgroundColor = '#000',
  spinnerColor = '#57B9C2',
  size = 44 
}) => {
  return (
    <StyledWrapper $backgroundColor={backgroundColor}>
      <div className="loading-container">        <div className="spinner" style={{ width: size, height: size }}>
          <div style={{ borderColor: spinnerColor, backgroundColor: `${spinnerColor}1A`, boxShadow: `0 0 10px ${spinnerColor}4D` }} />
          <div style={{ borderColor: spinnerColor, backgroundColor: `${spinnerColor}1A`, boxShadow: `0 0 10px ${spinnerColor}4D` }} />
          <div style={{ borderColor: spinnerColor, backgroundColor: `${spinnerColor}1A`, boxShadow: `0 0 10px ${spinnerColor}4D` }} />
          <div style={{ borderColor: spinnerColor, backgroundColor: `${spinnerColor}1A`, boxShadow: `0 0 10px ${spinnerColor}4D` }} />
          <div style={{ borderColor: spinnerColor, backgroundColor: `${spinnerColor}1A`, boxShadow: `0 0 10px ${spinnerColor}4D` }} />
          <div style={{ borderColor: spinnerColor, backgroundColor: `${spinnerColor}1A`, boxShadow: `0 0 10px ${spinnerColor}4D` }} />
        </div>
        {message && <p className="loading-message">{message}</p>}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div<{ $backgroundColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: ${props => props.$backgroundColor};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .loading-message {
    color: #efefef;
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
    text-align: center;
    opacity: 0.9;
    font-family: var(--font-basement-grotesque, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  }

  .spinner {
   animation: spinner-y0fdc1 2s infinite ease;
   transform-style: preserve-3d;
  }

  .spinner > div {
   height: 100%;
   position: absolute;
   width: 100%;
   border: 2px solid;
  }

  .spinner div:nth-of-type(1) {
   transform: translateZ(-22px) rotateY(180deg);
  }

  .spinner div:nth-of-type(2) {
   transform: rotateY(-270deg) translateX(50%);
   transform-origin: top right;
  }

  .spinner div:nth-of-type(3) {
   transform: rotateY(270deg) translateX(-50%);
   transform-origin: center left;
  }

  .spinner div:nth-of-type(4) {
   transform: rotateX(90deg) translateY(-50%);
   transform-origin: top center;
  }

  .spinner div:nth-of-type(5) {
   transform: rotateX(-90deg) translateY(50%);
   transform-origin: bottom center;
  }

  .spinner div:nth-of-type(6) {
   transform: translateZ(22px);
  }

  @keyframes spinner-y0fdc1 {
   0% {
    transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
   }

   50% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
   }

   100% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
   }
  }
`;

export default Loader;
