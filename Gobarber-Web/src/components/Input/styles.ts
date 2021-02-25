import styled, { css } from 'styled-components';
import ToolTip from '../ToolTip';

interface ContainerProp {
  isFocus: boolean;
  isFiled: boolean;
  isErrored: boolean;
}
export const Error = styled(ToolTip)`
  span {
    color: #fff;
    background: #e5593f;
    &::before {
      border-color: #e5593f transparent;
    }
  }
`;
export const Container = styled.div<ContainerProp>`
  color: #666360;
  border: 2px solid #232129;
  width: 340px;
  height: 56px;
  background: #232129;
  border-radius: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & + div {
    margin-top: 20px;
  }
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #e5593f;
    `}

  ${(props) =>
    props.isFocus &&
    css`
      color: #ff9000;
      border: 2px solid #ff9000;
    `}

  ${(props) =>
    props.isFiled &&
    css`
      color: #ff9000;
    `}

  @media (max-width: 1000px) {
    width: 600px;
    height: 112px;
    input {
      font-size: 38px;
    }
  }
  svg {
    margin: 0 10px;
  }
  input {
    color: #fff;
    background: transparent;
    border: none;
    flex: 1;
    height: 100%;
    &::placeholder {
      color: #666360;
    }
  }
`;
