import React, { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

type ButtonProp = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Input: React.FC<ButtonProp> = ({ children, loading, ...props }) => (
  <Container type="button" {...props}>
    {loading ? '... carregando' : children}
  </Container>
);

export default Input;
