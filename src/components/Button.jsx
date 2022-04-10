import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  border: none;
  width: 215px;
  height: 40px;
  left: 615px;
  top: 20px;
  background: ${({ color }) => (color === 'red' ? '#ff6a6a' : '#BBBBBB')};
  color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  &:active {
    background: ${({ color }) => (color === 'red' ? '#c53333' : '#6F6F6F')};
  }
  &:hover {
    background: ${({ color }) => (color === 'red' ? '#ff4343' : '#9c9c9c')};
  }
  &.inactive {
    background: ${({ color }) => color === 'red' && '#fabfbf'};
    cursor: ${({ color }) => color === 'red' && 'default'};
  }
  transition: 0.2s;
`;

const Button = ({ text, color, active, onClick }) => {
  return (
    <StyledButton color={color} className={active ? 'active' : 'inactive'} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
