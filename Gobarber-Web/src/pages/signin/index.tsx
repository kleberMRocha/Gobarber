import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Buttom';

import { Container, Content, AnimationContainer, Background } from './styles';
import { useAuth } from '../../hooks/authContext';
import { useToast } from '../../hooks/toastContext';

interface FormUserData {
  email: string;
  password: string;
}
const Forgot: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { sigin } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: FormUserData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Por favor, inserir um e-mail valido.')
            .email('Insira um e-mail valido.'),
          password: Yup.string().min(6, 'Senha Obrigatoria!'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        const { email, password } = data;
        await sigin({ email, password });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          title: 'erros',
          type: 'error',
          description: 'houve um erro!',
        });
      }
    },
    [sigin, addToast],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Entrar</Button>

            <Link to="/forgot"> Esqueci minha senha </Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default Forgot;
