import React, { useEffect, useMemo, useState } from 'react';
import { MUIDataTableColumn } from "mui-datatables";
import api from '../../services/api';
import { formatarData } from '../../services/dateFormater';

import ModalAddAntimicrobial from './ModalAddAntimicrobial';
import ModalEditAntimicrobial from './ModalEditAntimicrobial';
import { useToast } from '../../hooks/ToastContext';
import Teste from '../../components/Teste'
import ActionButtons from '../../components/ActionButtons'
import { IAntimicrobialList } from '../../models/Antimicrobial'

const Antimicrobial: React.FC = () => {
  const columns: MUIDataTableColumn[] = [

    { name: 'nome', label: 'Nome' },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <ActionButtons
              delete={() => handleDeleteAntimicrobial(antimicrobialList[dataIndex].id)}
              edit={() =>
                handleEditAntimicrobial(antimicrobialList[dataIndex])}
            />

          );
        }
      }
    },
  ];
  const [antimicrobialList, setAntimicrobialList] = useState<IAntimicrobialList[]>([]);
  useEffect(() => {
    api.get('/antimicrobial').then((response) => {

      setAntimicrobialList(response.data[0])
    }
    );

  }, [])

  const translatedAntimicrobial = useMemo(() => {
    return antimicrobialList.map((index) => {
      return { ...index, created_at: formatarData(index.created_at), updated_at: formatarData(index.updated_at) }
    })
  }, [antimicrobialList])


  const [editingAntimicrobial, setEditingAntimicrobial] = useState<IAntimicrobialList>({} as IAntimicrobialList);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { addToast } = useToast();

  async function handleAddAntimicrobial({
    nome,
  }: Omit<IAntimicrobialList, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    try {
      const response = await api.post('antimicrobial', {
        nome,
      });

      setAntimicrobialList(oldAntimicrobial => [...oldAntimicrobial, response.data]);
    } catch (error) {
      console.log(error.response);
      addToast({
        title: "Erro ao salvar antimicrobiano",
        description: error.response.data.message,
        type: 'error'
      })
    }
  }

  async function handleUpdateAntimicrobial(
    antimicrobial: Omit<IAntimicrobialList, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<void> {
    const updatedAntimicrobial = {
      ...editingAntimicrobial,
      ...antimicrobial,
    };

    await api.put(`antimicrobial`, updatedAntimicrobial);

    const updatedsAntimicrobial = antimicrobialList.map(oldAntimicrobial => {
      if (oldAntimicrobial.id === updatedAntimicrobial.id) {
        return updatedAntimicrobial;
      }

      return oldAntimicrobial;
    });

    setAntimicrobialList(updatedsAntimicrobial);
  }

  async function handleDeleteAntimicrobial(id: string): Promise<void> {
    await api.delete(`antimicrobial/${id}`);

    const updatedAntimicrobialList = antimicrobialList.filter(antimicrobial => antimicrobial.id !== id);

    if (updatedAntimicrobialList) {
      setAntimicrobialList(updatedAntimicrobialList);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditAntimicrobial(antimicrobial: IAntimicrobialList): void {
    setEditingAntimicrobial(antimicrobial);
    toggleEditModal();
  }

  return (
    <>
      <div>
        <ModalAddAntimicrobial
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddAntimicrobial={handleAddAntimicrobial}
        />
        <ModalEditAntimicrobial
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingAntimicrobial={editingAntimicrobial}
          handleUpdateAntimicrobial={handleUpdateAntimicrobial}
        />
        <Teste
          title="Antimicrobianos"
          data={translatedAntimicrobial}
          columns={columns}
          toggleModal={toggleModal}
        />
      </div>
    </>
  );
}

export default Antimicrobial;
