import React, { InputHTMLAttributes, useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ComponentType<IconBaseProps>;
  error?: string
}

const Input: React.FC<InputProps> = ({ icon: Icon, error, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      {Icon && <Icon size={20}></Icon>}
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest} />
      {error && <Error title={error}><FiAlertCircle size={20} /></Error>}
    </Container>
  )
}
export default Input;
