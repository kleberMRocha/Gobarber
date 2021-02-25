import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 340px;
  height: 56px;
  background: #ff9000;
  font-weight: 500;
  border-radius: 10px;
  margin-top: 20px;
  border: none;
  transition: background-color 0.5s;
  &:hover {
    background: ${shade(0.2, '#ff9000')};
  }
  @media (max-width: 1000px) {
    width: 600px;
    height: 112px;
    font-size: 40px;
  }
`;
