import styled from 'styled-components';
import { shade } from 'polished';
import { appear, appearFromleft } from '../signin/styles';
import background from '../../assets/sign-up-background.png';

export const Main = styled.main`
  width: 100%;
  display: flex;
  padding: 0 50px;
  box-sizing: border-box;
  justify-content: center;
`;

export const HeaderContent = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 50px;
  box-sizing: border-box;
  svg {
    font-size: 1.2rem;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 144px;
  position: absolute;
  display: inherit;
  align-items: center;
  background-color: #28262e;
  padding: 15px 0;
`;

export const ProfilePicture = styled.div`
  position: relative;
  margin-top: 250px;
  width: 186px;
  height: 186px;
  img {
    min-width: 100%;
    border-radius: 50%;
  }
  input {
    display: none;
  }
  label {
    background: #ff9000;
    cursor: pointer;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 48px;
    height: 48px;
    bottom: -5px;
    right: 10px;
    &:hover {
      opacity: 0.9;
    }
  }
  svg {
    font-size: 1rem;
  }
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
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
    margin: 50px 0;
    width: 300px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    button{
      margin-bottom: 20px;
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
`;
