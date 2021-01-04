import React from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import * as yup from 'yup';
import { Form } from './styles';
import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import { useFormik } from 'formik';
import IPathogen from '../../../models/Pathogen'

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdatePathogen: (Pathogen: Omit<IPathogen, 'id' | 'created_at' | 'updated_at'>) => void;
  editingPathogen: IPathogen;
}
const ModalEditPathogen: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingPathogen,
  handleUpdatePathogen,
}) => {
  const validationSchema = yup.object().shape({
    nome: yup
      .string().required('Digite o nome')
      .required('O nome é obrigatório'),
    descricao: yup
      .string().required('Digite a descrição')
      .required('A descrição é obrigatória'),
  },
  );


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nome: editingPathogen.nome,
      descricao: editingPathogen.descricao
    },
    onSubmit: (values) => {
      handleUpdatePathogen(values);
      setIsOpen();
    },
    validationSchema: validationSchema,
  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={formik.handleSubmit} >
        <h1>Editar</h1>
        <Input
          value={formik.values.nome}
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


        <button type="submit" data-testid="edit-Pathogen-button">
          <div className="text">Editar</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditPathogen;
