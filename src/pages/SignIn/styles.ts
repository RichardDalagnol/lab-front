import styled, { keyframes } from 'styled-components'
import { shade } from 'polished'
import BackgroundImg from '../../assets/login-background.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;

  align-items: stretch;
`;


export const apperFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  animation: ${apperFromLeft} 1s;
  form {
    margin: 40px 0;
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom : 16px;
    }
  }

  a {
    color: #0088c0;
    display: block;
    margin-top: 10px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      stroke: #0088c0;
      margin-right: 16px;
    }

    &:hover{
      color: ${shade(0.5, '#0088cc')};
      svg {
        stroke: ${shade(0.5, '#0088cc')}
      }
    }
  }
`;


export const Content = styled.div`

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;

`;
export const Background = styled.div`
flex: 1;
background: url(${BackgroundImg}) no-repeat center;
background-size: cover;
`;
