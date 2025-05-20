"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 1000;
  .Btn {
    width: 45px;
    height: 45px;
    background: linear-gradient(#44ea76, #57B9C2);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    border: none;
    outline: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }
  .arrow path {
    fill: black;
  }
  .text {
    font-size: 0.7em;
    width: 100px;
    position: absolute;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: -18px;
    opacity: 0;
    transition-duration: 0.7s;
  }
  .Btn:hover .text {
    opacity: 1;
    transition-duration: 0.7s;
  }
  .Btn:hover .arrow {
    animation: slide-in-bottom 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  @keyframes slide-in-bottom {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 1500); // Increased threshold for appearing
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <StyledWrapper>
      <button className="Btn" onClick={scrollToTop} aria-label="Back to Top">
        <svg
          height="1.2em"
          className="arrow"
          viewBox="0 0 512 512"
        >
          <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

export default ScrollToTopButton;
