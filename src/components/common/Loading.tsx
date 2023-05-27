import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for the loading animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled component for the loading spinner
const Spinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

// Styled component for the loading spinner icon
const SpinnerIcon = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

// Loading component
const Loading: React.FC = () => {
  return (
    <Spinner>
      <SpinnerIcon />
    </Spinner>
  );
};

export default Loading;
