import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type?: 'info' | 'error' | 'sucess';
  hasDescription: boolean;
}

const toastVariation = {
  info: css`
    background: #ebf8ff;
    color: #3172b7;
  `,
  error: css`
    background: #ffb5b0;
    color: #c53030;
  `,
  sucess: css`
    background: #ebfffa;
    color: #2e656a;
  `,
};

export const Container = styled(animated.div)<ToastProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;

  & + div {
    margin-top: 15px;
  }

  ${(props) => toastVariation[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }
  div {
    flex: 1;
  }
  p {
    margin-top: 4px;
    font-size: 14 px;
    opacity: 0.8;
    line-height: 20px;
  }
  button {
    position: absolute;
    right: 0;
    top: 19px;
    margin-right: 5px;
    opacity: 0.8;
    border: 0;
    background: transparent;
    color: inherit;
  }
  ${(props) =>
    !props.hasDescription &&
    css`
      align-items: center;
    `}
`;
