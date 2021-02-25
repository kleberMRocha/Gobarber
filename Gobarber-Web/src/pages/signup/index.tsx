import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUser, FiArrowLeft, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Buttom';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toastContext';

import { Container, Content, AnimatedContainer, Background } from './styles';
import api from '../../services/api';

interface SignUpProps {
  name: string;
  eamil: string;
  password: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpProps) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Por favor, preencha o campo Nome.'),
          email: Yup.string()
            .required('Por favor, inserir um e-mail valido.')
            .email('Insira um e-mail valido.'),
          password: Yup.string().min(6, 'Minimo de 6 digitos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);
        addToast({
          type: 'sucess',
          title: 'Usuário cadastrado',
          description: 'Usuário cadastrado com Sucesso!',
        });
        history.push('/');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          title: 'Erro ao cadastrar',
          type: 'error',
          description: 'houve um ao realizar o seu cadastro erro!',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para o Logon
          </Link>
        </AnimatedContainer>
      </Content>
    </Container>
  );
};

export default Profile;
