import React, { useEffect, useMemo, useState } from 'react';
import { MUIDataTableColumn } from "mui-datatables";
import api from '../../services/api';
import { formatarData } from '../../services/dateFormater';

import ModalAddPathogen from './ModalAddPathogen';
import ModalEditPathogen from './ModalEditPathogen';
import { useToast } from '../../hooks/ToastContext';
import Teste from '../../components/Teste'
import ActionButtons from '../../components/ActionButtons'
import { IPathogenList } from '../../models/Pathogen'


const Pathogen: React.FC = () => {
  const columns: MUIDataTableColumn[] = [

    { name: 'nome', label: 'Nome' },
    { name: 'descricao', label: 'Descrição' },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <ActionButtons
              delete={() => handleDeletePathogen(PathogenList[dataIndex].id || '')}
              edit={() =>
                handleEditPathogen(PathogenList[dataIndex])}
            />

          );
        }
      }
    },
  ];
  const [PathogenList, setPathogenList] = useState<IPathogenList[]>([]);
  useEffect(() => {
    api.get('/Pathogen').then((response) => {

      setPathogenList(response.data[0])
    }
    );

  }, [])

  const translatedPathogen = useMemo(() => {
    return PathogenList.map((index) => {
      return { ...index, created_at: formatarData(index.created_at), updated_at: formatarData(index.updated_at) }
    })
  }, [PathogenList])


  const [editingPathogen, setEditingPathogen] = useState<IPathogenList>({} as IPathogenList);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { addToast } = useToast();

  async function handleAddPathogen({
    nome,
    descricao
  }: Omit<IPathogenList, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    try {
      const response = await api.post('pathogen', {
        nome,
        descricao
      });

      setPathogenList(oldPathogen => [...oldPathogen, response.data]);
    } catch (error) {
      console.log(error.response);
      addToast({
        title: "Erro ao salvar patógenos",
        description: error.response.data.message,
        type: 'error'
      })
    }
  }

  async function handleUpdatePathogen(
    Pathogen: Omit<IPathogenList, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<void> {
    const updatedPathogen = {
      ...editingPathogen,
      ...Pathogen,
    };

    await api.put(`Pathogen`, updatedPathogen);

    const updatedsPathogen = PathogenList.map(oldPathogen => {
      if (oldPathogen.id === updatedPathogen.id) {
        return updatedPathogen;
      }

      return oldPathogen;
    });

    setPathogenList(updatedsPathogen);
  }

  async function handleDeletePathogen(id: string): Promise<void> {
    await api.delete(`pathogen/${id}`);

    const updatedPathogenList = PathogenList.filter(Pathogen => Pathogen.id !== id);

    if (updatedPathogenList) {
      setPathogenList(updatedPathogenList);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditPathogen(Pathogen: IPathogenList): void {
    setEditingPathogen(Pathogen);
    toggleEditModal();
  }

  return (
    <>
      <div>
        <ModalAddPathogen
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddPathogen={handleAddPathogen}
        />
        <ModalEditPathogen
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingPathogen={editingPathogen}
          handleUpdatePathogen={handleUpdatePathogen}
        />
        <Teste
          title="Patógenos"
          data={translatedPathogen}
          columns={columns}
          toggleModal={toggleModal}
        />
      </div>
    </>
  );
}

export default Pathogen;
