"use client";

import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  .spinner {
   width: 44px;
   height: 44px;
   animation: spinner-y0fdc1 2s infinite ease;
   transform-style: preserve-3d;
  }

  .spinner > div {
   background-color: rgba(87, 185, 194, 0.1);
   height: 100%;
   position: absolute;
   width: 100%;
   border: 2px solid #57B9C2;
   box-shadow: 0 0 10px rgba(87, 185, 194, 0.3);
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
