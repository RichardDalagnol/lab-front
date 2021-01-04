import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

import { Container } from './styles';
interface ActionButtonsProps {
  edit?: () => void;
  delete?: () => void;
}
const ActionButtons: React.FC<ActionButtonsProps> = (props) => {
  return (
    <Container>

      {props.edit &&
        <button onClick={props.edit}>
          <MdEdit />
        </button>
      }
      {props.delete &&
        <button onClick={props.delete}>
          <MdDelete />
        </button>
      }
    </Container>
  )
}

export default ActionButtons;
