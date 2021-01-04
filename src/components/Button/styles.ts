import styled from 'styled-components'
import { shade } from 'polished';
export const Container = styled.button`
  background-color: #0088cc;
  border-radius: 10px;
  border: 2px solid #0088cc;
  padding: 16px;
  width: 100%;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover{
    background: ${shade(0.2, '#0088cc')}
  }
`;
