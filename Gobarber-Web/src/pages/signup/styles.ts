import styled from 'styled-components';
import { shade } from 'polished';
import { appear, appearFromleft } from '../signin/styles';
import background from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
export const AnimatedContainer = styled.div`
  animation: ${appearFromleft} 1s;
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 100%;
  max-width: 700px;
  align-items: center;
  img{
    width: 20%;
  }
  @media (max-width: 1000px) {
    max-width: 100%;
    img {
      width: 70%;
    }
  }
  h1 {
    margin-bottom: 10px;
  }
  > a {
    color: #fff;
    display:flex;
    align-items:center;
    justify-content:center;
    transition: color 0.5s;;
    text-align: center;
    text-decoration: none;
    &:hover {
      color: ${shade(0.2, '#fff')};
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
`;
export const Background = styled.div`
  flex: 1;
  background: url(${background}) no-repeat center;
  background-size: cover;
  animation: ${appear} 2s ease-in-out;
  @media (max-width: 1000px) {
    display: none;
  }
`;
