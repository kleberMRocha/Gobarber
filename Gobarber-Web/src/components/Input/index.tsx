import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocus, setIsFocus] = useState(false);
  const [isFiled, setIsFiled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleBlur = useCallback(() => {
    setIsFocus(!isFocus);
    setIsFiled(!!inputRef.current?.value);
  }, [isFocus]);

  const handleFocus = useCallback(() => {
    setIsFocus(!isFocus);
  }, []);

  return (
    <Container isErrored={!!error} isFiled={isFiled} isFocus={isFocus}>
      {Icon && <Icon size={20} />}
      <input
        name={name}
        onFocus={() => handleFocus()}
        onBlur={() => handleBlur()}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="tomato" size={20} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
