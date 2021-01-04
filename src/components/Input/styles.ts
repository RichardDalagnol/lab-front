import styled, { css } from 'styled-components'

import ToolTip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean
  isErrored: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  background-color: #eee;
  border-radius: 10px;
  border: 2px solid #eee;
  padding: 16px;
  width: 100%;
  margin-bottom: 10px;
  align-items: center;

  input {
    background: transparent;
    flex: 1;
    border: none;
  }

  svg {
    margin-right: 5px;
    color: #eee;
    stroke: #000;
  }

  ${props => props.isFocused && css`
    color: #0088cc;
    border-color: #0088cc;
    stroke: #0088cc;
    svg {
      stroke: #0088cc;
    }
  `}

  ${props => props.isErrored && css`
    color: #c53030;
    border-color: #c53030;
    svg {
      stroke: #c53030;
    }

  `}

`;


export const Error = styled(ToolTip)`
height: 20px;
margin-left: 16;
  svg{
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
     border-color: #c53030 transparent;
    }
  }
`;
