import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Buttom';

import { Container, Content, AnimationContainer, Background } from './styles';
import { useToast } from '../../hooks/toastContext';
import api from '../../services/api';

interface ForgotPasswordFormData {
  email: string;
}
const SignIn: React.FC = () => {
  const [loading, setLoadig] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        setLoadig(true);
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Por favor, inserir um e-mail valido.')
            .email('Insira um e-mail valido.'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { email } = data;

        await api.post('/password/forgot', { email });

        addToast({
          type: 'sucess',
          title: 'Email-enviado',
          description: 'email emviado para o seu email',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          title: 'erros',
          type: 'error',
          description: 'houve um ao recuperar a sua senha erro!',
        });
      } finally {
        setLoadig(false);
      }
    },
    [addToast],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button loading={loading} type="submit">
              Recuperar
            </Button>

            <Link to="/">
              <FiLogIn />
              Voltar á página inicial
            </Link>
          </Form>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
