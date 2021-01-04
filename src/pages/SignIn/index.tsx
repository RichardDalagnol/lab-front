import React from 'react';
import * as yup from 'yup';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import { useFormik } from 'formik';
import { Background, Container, Content, AnimationContainer } from './styles'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useAuth } from '../../hooks/AuthContext'
import LogoImg from '../../assets/logo.svg';
import { useToast } from '../../hooks/ToastContext';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {

  const validationSchema = yup.object().shape({
    email: yup
      .string().required('Digite seu email')
      .email('Enter a valid email')
      .required('O email é obrigatório'),
    senha: yup
      .string().required('Digite sua senha')
      .min(8, 'A senha deve conter 8 caracteres')
      .required('A senha é obrigatória'),

  },
  );

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: '',
    },
    onSubmit: async (values) => {
      try {

        await signIn(values);
      } catch (error) {
        addToast({
          title: "Erro na autenticação",
          description: error.response.data.error,
          type: 'error'
        })
      }
    },
    validationSchema: validationSchema,
  });
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="Lamivet" />
          <form onSubmit={formik.handleSubmit}>
            <h1> Faça seu Login</h1>
            <Input
              icon={FiMail}
              type="text"
              value={formik.values.email}
              name="email"
              id="email"
              onChange={formik.handleChange}
              placeholder="E-mail"
              error={formik.errors.email} />
            <Input icon={FiLock}
              type="password"
              name='senha'
              id='senha'
              value={formik.values.senha}
              onChange={formik.handleChange}
              placeholder="Senha"
              error={formik.errors.senha} />
            <Button type="submit">Entrar</Button>
          </form>

          <Link to='SignUp'>
            <FiLogIn />
          Criar conta
        </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn;
