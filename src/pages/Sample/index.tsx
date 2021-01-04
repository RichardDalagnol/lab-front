import React, { useEffect, useMemo, useState } from 'react';
import { MUIDataTableOptions, MUIDataTableColumn } from "mui-datatables";
import api from '../../services/api';
import { formatarData } from '../../services/dateFormater';

import ModalAddSample from './ModalAddSample';
import ModalEditSample from './ModalEditSample';
import { useToast } from '../../hooks/ToastContext';
import Teste from '../../components/Teste'
import ActionButtons from '../../components/ActionButtons'
import ISample, { ISampleList } from '../../models/Sample'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";


const Sample: React.FC = () => {
  const options: MUIDataTableOptions = {
    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      const sampleItemns = SampleList[rowMeta.dataIndex].amostraItens;
      return (
        <>
          {sampleItemns.length > 0 && (
            <tr>
              <td colSpan={10}>
                <TableContainer style={{ minWidth: "650", width: ' 100%' }} >
                  <Table style={{ minWidth: "650", width: ' 100%' }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Swabs</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sampleItemns.map(row => (
                        <TableRow key={row.descricao}>
                          <TableCell component="th" scope="row">
                            {row.descricao}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </td>
            </tr>
          )}
        </>)
    }
  }
  const columns: MUIDataTableColumn[] = [
    { name: 'numero', label: 'LM' },
    { name: 'ano', label: 'Ano' },
    { name: 'dataRecebimento', label: 'Data de Recebimento' },
    { name: 'descricao', label: 'Descrição' },
    { name: 'requisitante.nome', label: 'Requisitante' },
    { name: 'observacao', label: 'Observação', options: { print: false, display: 'false' } },
    { name: 'valor', label: 'Valor' },
    { name: 'proprietario', label: 'Proprietário' },
    { name: 'sexo', label: 'Sexo', options: { print: false, display: 'false' } },
    { name: 'idade', label: 'Idade', options: { print: false, display: 'false' } },
    { name: 'raca', label: 'Raça', options: { print: false, display: 'false' } },
    { name: 'especie', label: 'Espécie', options: { print: false, display: 'false' } },
    { name: 'flagTratamento', label: 'Tratamento', options: { print: false, display: 'false' } },
    { name: 'flagAcondicionada', label: 'Acondicionada', options: { print: false, display: 'false' } },
    { name: 'flagPago', label: 'Pago', options: { print: false, display: 'false' } },
    {
      name: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex) => {
          return (
            <ActionButtons
              delete={() => handleDeleteSample(SampleList[dataIndex].id || '')}
              edit={() =>
                handleEditSample(SampleList[dataIndex])}
            />

          );
        }
      }
    },
  ];
  const [SampleList, setSampleList] = useState<ISampleList[]>([]);
  useEffect(() => {
    api.get('/sample').then((response) => {

      setSampleList(response.data[0])
    }
    );
  }, [])

  const translatedSample = useMemo(() => {
    return SampleList.map((index) => {
      return {
        ...index, created_at: formatarData(index.created_at),
        updated_at: formatarData(index.updated_at),
        dataRecebimento: formatarData(index.dataRecebimento),
        flagPago: index.flagPago ? 'Sim' : 'Não',
        flagAcondicionada: index.flagAcondicionada ? 'Sim' : 'Não',
        flagTratamento: index.flagTratamento ? 'Sim' : 'Não',
      }
    })
  }, [SampleList])


  const [editingSample, setEditingSample] = useState<ISampleList>({} as ISampleList);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { addToast } = useToast();

  // async function handleAddSample({
  //   nome, bairro, cidade, email, numero, rua, telefone
  // }: Omit<ISample, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
  //   try {
  //     const response = await api.post('Sample', {
  //       nome, bairro, cidade, email, numero, rua, telefone
  //     });

  //     setSampleList(oldSample => [...oldSample, response.data]);
  //   } catch (error) {
  //     console.log(error.response);
  //     addToast({
  //       title: "Erro ao salvar patógenos",
  //       description: error.response.data.message,
  //       type: 'error'
  //     })
  //   }
  // }

  async function handleUpdateSample(
    Sample: Omit<ISampleList, 'id' | 'created_at' | 'updated_at'>,
  ): Promise<void> {
    const updatedSample = {
      ...editingSample,
      ...Sample,
    };

    await api.put(`Sample`, updatedSample);

    const updatedsSample = SampleList.map(oldSample => {
      if (oldSample.id === updatedSample.id) {
        return updatedSample;
      }

      return oldSample;
    });

    setSampleList(updatedsSample);
  }

  async function handleDeleteSample(id: string): Promise<void> {
    await api.delete(`sample/${id}`);

    const updatedSampleList = SampleList.filter(Sample => Sample.id !== id);

    if (updatedSampleList) {
      setSampleList(updatedSampleList);
    }
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditSample(Sample: ISampleList): void {
    setEditingSample(Sample);
    toggleEditModal();
  }

  return (
    <>
      <div>
        {/* <ModalAddSample
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddSample={handleAddSample}
        />
        <ModalEditSample
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingSample={editingSample}
          handleUpdateSample={handleUpdateSample}
        /> */}
        <Teste
          title="LMs"
          data={translatedSample}
          columns={columns}
          toggleModal={toggleModal}
          options={options}
        />
      </div>
    </>
  );
}

export default Sample;
