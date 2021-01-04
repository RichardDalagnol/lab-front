import React from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { useFormik } from 'formik'
import { Form } from './styles';
import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import * as yup from 'yup';
import IPathogen from '../../../models/Pathogen'

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddPathogen: (Pathogen: Omit<IPathogen, 'id'>) => void;
}

const ModalAddPathogen: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddPathogen,
}) => {
  const validationSchema = yup.object().shape({
    nome: yup
      .string().required('Digite o nome')
      .required('O nome é obrigatório'),
    descricao: yup
      .string().required('Digite a descrição')
      .required('A descrição é obrigatório'),
  },
  );

  const formik = useFormik({
    initialValues: {
      nome: '',
      descricao: '',
    },
    onSubmit: async (values) => {
      await handleAddPathogen(values);
      setIsOpen();
      formik.resetForm();
    },
    validationSchema: validationSchema,

  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={formik.handleSubmit}>
        <h1>Novo Patógeno</h1>
        <Input value={formik.values.nome}
          name="nome"
          id="nome"
          onChange={formik.handleChange}
          placeholder="Nome"
          error={formik.errors.nome} />
        <Input
          value={formik.values.descricao}
          name="descricao"
          id="descricao"
          onChange={formik.handleChange}
          placeholder="Descrição"
          error={formik.errors.descricao} />

        <button type="submit" data-testid="add-Pathogen-button">
          <p className="text">Adicionar</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddPathogen;
