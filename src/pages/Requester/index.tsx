import React, { useEffect, useMemo, useState } from 'react';
import { MUIDataTableColumn } from "mui-datatables";
import api from '../../services/api';
import { formatarData } from '../../services/dateFormater';

import ModalAddRequester from './ModalAddRequester';
import ModalEditRequester from './ModalEditRequester';
import { useToast } from '../../hooks/ToastContext';
import Teste from '../../components/Teste'
import ActionButtons from '../../components/ActionButtons'
import IRequester, { IRequesterList } from '../../models/Requester'


const Requester: React.FC = () => {
  const columns: MUIDataTableColumn[] = [

    { name: 'nome', label: 'Nome' },
    { name: 'email', label: 'Email' },
    { name: 'telefone', label: 'Telefone' },
    { name: 'bairro', label: 'Bairro' },
    { name: 'rua', label: 'Rua' },
    { name: 'cidade', label: 'Cidade' },
    { name: 'numero', label: 'Número' },

    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <ActionButtons
              delete={() => handleDeleteRequester(RequesterList[dataIndex].id || '')}
              edit={() =>
                handleEditRequester(RequesterList[dataIndex])}
            />

          );
        }
      }
    },
  ];
  const [RequesterList, setRequesterList] = useState<IRequesterList[]>([]);
  useEffect(() => {
    api.get('/requester').then((response) => {

      setRequesterList(response.data[0])
    }
    );
  }, [])

  const translatedRequester = useMemo(() => {
    return RequesterList.map((index) => {
      return { ...index, created_at: formatarData(index.created_at), updated_at: formatarData(index.updated_at) }
    })
  }, [RequesterList])


  const [editingRequester, setEditingRequester] = useState<IRequesterList>({} as IRequesterList);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { addToast } = useToast();

  async function handleAddRequester({
    nome, bairro, cidade, email, numero, rua, telefone
  }: Omit<IRequester, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    try {
      const response = await api.post('requester', {
        nome, bairro, cidade, email, numero, rua, telefone
      });

      setRequesterList(oldRequester => [...oldRequester, response.data]);
    } catch (error) {
      console.log(error.response);
      addToast({
        title: "Erro ao salvar patógenos",
        description: error.response.data.message,
        type: 'error'
      })
    }
  }

  async function handleUpdateRequester(
    Requester: Omit<IRequesterList, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<void> {
    const updatedRequester = {
      ...editingRequester,
      ...Requester,
    };

    await api.put(`requester`, updatedRequester);

    const updatedsRequester = RequesterList.map(oldRequester => {
      if (oldRequester.id === updatedRequester.id) {
        return updatedRequester;
      }

      return oldRequester;
    });

    setRequesterList(updatedsRequester);
  }

  async function handleDeleteRequester(id: string): Promise<void> {
    await api.delete(`Requester/${id}`);

    const updatedRequesterList = RequesterList.filter(Requester => Requester.id !== id);

    if (updatedRequesterList) {
      setRequesterList(updatedRequesterList);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditRequester(Requester: IRequesterList): void {
    setEditingRequester(Requester);
    toggleEditModal();
  }

  return (
    <>
      <div>
        <ModalAddRequester
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddRequester={handleAddRequester}
        />
        <ModalEditRequester
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingRequester={editingRequester}
          handleUpdateRequester={handleUpdateRequester}
        />
        <Teste
          title="Requisitantes"
          data={translatedRequester}
          columns={columns}
          toggleModal={toggleModal}
        />
      </div>
    </>
  );
}

export default Requester;
