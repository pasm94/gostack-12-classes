import styled, { css } from 'styled-components'

interface ContainerPros {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerPros>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  
  border: 2px solid #232129;
  color: #666360;

  display: flex;
  align-items: center;

  & + div { // todo input que seja precedido de outro input
    margin-top: 8px;
  }

  ${props => props.isFocused && css`
    color: #FF9000;
    border-color: #FF9000;
  `}

  ${props => props.isFilled && css`
    color: #FF9000;
  `}

  input {
    background: transparent;
    flex: 1; // vai ocupar todo espaco na div de cima
    border: 0;
    color: #F4EDE8;

    &::placeholder {
      color: #666360;
    }

  }

  svg {
    margin-right: 16px;
  }
`