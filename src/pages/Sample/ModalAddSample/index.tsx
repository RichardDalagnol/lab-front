import React from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { useFormik } from 'formik'
import { Form, Row } from './styles';
import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import * as yup from 'yup';
import IRequester from '../../../models/Requester'

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddRequester: (Requester: Omit<IRequester, 'id'>) => void;
}

const ModalAddRequester: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddRequester,
}) => {
  const validationSchema = yup.object().shape({
    nome: yup
      .string().required('Digite o nome')
      .required('O nome é obrigatório'),
  },
  );

  const formik = useFormik({
    initialValues: {
      nome: '',
      bairro: '',
      cidade: '',
      email: '',
      numero: 0,
      rua: '',
      telefone: '',
    },
    onSubmit: async (values) => {
      await handleAddRequester(values);
      setIsOpen();
      formik.resetForm();
    },
    validationSchema: validationSchema,

  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={formik.handleSubmit}>
        <h1>Novo Requisitante</h1>
        <Row>
          <Input value={formik.values.nome}
            name="nome"
            id="nome"
            onChange={formik.handleChange}
            placeholder="Nome"
            error={formik.errors.nome} />
          <Input value={formik.values.email}
            name="email"
            id="email"
            onChange={formik.handleChange}
            placeholder="Email"
            error={formik.errors.email} />
          <Input value={formik.values.telefone}
            name="telefone"
            id="telefone"
            onChange={formik.handleChange}
            placeholder="Telefone"
            error={formik.errors.telefone} />
        </Row>
        <Row>
          <Input value={formik.values.rua}
            name="rua"
            id="rua"
            onChange={formik.handleChange}
            placeholder="Rua"
            error={formik.errors.rua} />
          <Input value={formik.values.bairro}
            name="bairro"
            id="bairro"
            onChange={formik.handleChange}
            placeholder="Bairro"
            error={formik.errors.bairro} />
          <Input value={formik.values.numero}
            name="numero"
            id="numero"
            onChange={formik.handleChange}
            placeholder="Número"
            error={formik.errors.numero}
            type='number'
            min='0' />
        </Row>
        <Input value={formik.values.cidade}
          name="cidade"
          id="cidade"
          onChange={formik.handleChange}
          placeholder="Cidade"
          error={formik.errors.cidade}
        />
        <button type="submit" data-testid="add-Requester-button">
          <p className="text">Adicionar</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddRequester;
