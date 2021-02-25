import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import background from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const appearFromleft = keyframes`
from{
  opacity: 0;
  transform: translateX(-50px);

}
to{
  opacity: 1;
  transform: translateX(0px);
}
`;

export const appear = keyframes`
from{
  opacity: 0;
}
to{
  opacity: 1;
}
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 100%;
  max-width: 700px;
  align-items: center;
  animation: ${appearFromleft} 1s;
  h1 {
    margin-bottom: 24px;
  }
  > a {
    color: #ff9000;
    transition: color 0.5s;
    line-height: 21px;
    text-align: center;
    text-decoration: none;
    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
    @media (max-width: 1000px) {
      font-size: 40px;
    }
  }
  form {
    margin: 80px 0;
    width: 300px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      color: #fff;
      font-weight: bold;
      text-decoration: none;
      margin-top: 5px;
      @media (max-width: 1000px) {
        font-size: 28px;
      }
    }
  }
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 100%;
  max-width: 700px;
  align-items: center;
  @media (max-width: 1000px) {
    max-width: 100%;
    img {
      width: 70%;
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center;
  background-size: cover;
  animation: ${appear} 1s ease-in-out;
  @media (max-width: 1000px) {
    display: none;
  }
`;
