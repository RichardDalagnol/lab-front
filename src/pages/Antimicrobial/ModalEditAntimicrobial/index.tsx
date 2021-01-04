import React from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import * as yup from 'yup';
import { Form } from './styles';
import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import { useFormik } from 'formik';
import IAntimicrobial from '../../../models/Antimicrobial'

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateAntimicrobial: (Antimicrobial: Omit<IAntimicrobial, 'id' | 'created_at' | 'updated_at'>) => void;
  editingAntimicrobial: IAntimicrobial;
}
const ModalEditAntimicrobial: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingAntimicrobial,
  handleUpdateAntimicrobial,
}) => {
  const validationSchema = yup.object().shape({
    nome: yup
      .string().required('Digite o nome')
      .required('O nome é obrigatório')
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nome: editingAntimicrobial.nome
    },
    onSubmit: (values) => {
      handleUpdateAntimicrobial(values);
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


        <button type="submit" data-testid="edit-Antimicrobial-button">
          <div className="text">Editar</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditAntimicrobial;
