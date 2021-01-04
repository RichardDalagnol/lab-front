import React from 'react';
import * as yup from 'yup';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi'
import { useFormik } from 'formik';
import { Background, Container, Content, AnimationContainer } from './styles'
import Input from '../../components/Input'
import Button from '../../components/Button'
import LogoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';



const SignUp: React.FC = () => {

  const history = useHistory()
  const validationSchema = yup.object().shape({
    email: yup
      .string().required('Digite seu email')
      .email('Enter a valid email')
      .required('O email é obrigatório'),
    senha: yup
      .string().required('Digite sua senha')
      .min(8, 'A senha deve conter 8 caracteres')
      .required('A senha é obrigatória'),
    nome: yup
      .string().required('Digite seu nome')
      .required('O nome é obrigatório'),
    confirmarSenha: yup.string()
      .required('A confirmação da senha é obriatória')
      .oneOf([yup.ref('senha')], 'As senhas devem ser iguais')

  },
  );

  const { addToast } = useToast();

  const formik = useFormik({
    initialValues: {
      email: '',
      nome: '',
      confirmarSenha: '',
      senha: '',
    },
    onSubmit: async (values) => {
      try {
        await api.post('/user', values)
        history.push('/')
        addToast({
          title: 'Cadastro salvo com sucesso',
          type: 'success'
        })
      } catch (error) {
        addToast({
          title: "Erro ao cadastrar",
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
            <h1> Faça seu Cadastro</h1>
            <Input
              icon={FiUser}
              type="text"
              value={formik.values.nome}
              name="nome"
              id="nome"
              onChange={formik.handleChange}
              placeholder="Nome"
              error={formik.errors.nome} />

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
            <Input icon={FiLock}
              type="password"
              name='confirmarSenha'
              id='confirmarSenha'
              value={formik.values.confirmarSenha}
              onChange={formik.handleChange}
              placeholder="Confirme sua senha"
              error={formik.errors.confirmarSenha} />
            <Button type="submit">Criar conta</Button>
          </form>

          <Link to='/'>
            <FiArrowLeft />
          Fazer login
        </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default SignUp;
