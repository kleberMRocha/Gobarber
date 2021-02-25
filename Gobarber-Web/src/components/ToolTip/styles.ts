import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  span {
    width: 170px;
    color: #312e38;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.5s;
    position: absolute;
    text-align: center;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    &::before {
      content: '';
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    &:hover {
      opacity: 1;
    }
    @media (max-width: 1000px) {
      width: 600px;
      height: 112px;
      font-size: 40px;
      left: 0;
      transform: translateX(-92%);
    }
  }
`;
