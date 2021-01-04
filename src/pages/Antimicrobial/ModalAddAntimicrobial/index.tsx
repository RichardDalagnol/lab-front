import React from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { useFormik } from 'formik'
import { Form } from './styles';
import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import * as yup from 'yup';
import IAntimicrobial from '../../../models/Antimicrobial'


interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddAntimicrobial: (Antimicrobial: Omit<IAntimicrobial, 'id'>) => void;
}

const ModalAddAntimicrobial: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddAntimicrobial,
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
    },
    onSubmit: async (values) => {
      await handleAddAntimicrobial(values);
      setIsOpen();
      formik.resetForm();
    },
    validationSchema: validationSchema,

  });

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={formik.handleSubmit}>
        <h1>Novo Antimicrobiano</h1>
        <Input value={formik.values.nome}
          name="nome"
          id="nome"
          onChange={formik.handleChange}
          placeholder="Nome"
          error={formik.errors.nome} />

        <button type="submit" data-testid="add-Antimicrobial-button">
          <p className="text">Adicionar</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddAntimicrobial;
