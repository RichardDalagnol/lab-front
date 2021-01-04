import MUIDataTable, { MUIDataTableColumnDef, MUIDataTableOptions, MUIDataTableProps } from 'mui-datatables'
import CustomToolBar from '../AddButtonToolBar'
import React from 'react'

interface DataTableProps extends MUIDataTableProps {
  toggleModal: () => void;
}


const DataTable: React.FC<DataTableProps> = (props) => {
  const options: MUIDataTableOptions = {
    filter: true,
    filterType: "dropdown",
    responsive: 'standard',
    fixedHeader: false,
    fixedSelectColumn: false,
    enableNestedDataAccess: '.',
    customToolbar: () => {
      return (
        <CustomToolBar handleAddAntimicrobial={props.toggleModal}></CustomToolBar>
      )
    },
    textLabels: {
      body: {
        noMatch: "Nenhum registro encontrado",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      },
      pagination: {
        next: "Próxima página",
        previous: "Página anterior",
        rowsPerPage: "Linhas por página:",
        displayRows: "de",
      },
      toolbar: {
        search: "Procurar",
        downloadCsv: "Download CSV",
        print: "Imprimir",
        viewColumns: "Colunas",
        filterTable: "Filtrar",
      },
      filter: {
        all: "Todos",
        title: "Filtros",
        reset: "Limpar",
      },
      viewColumns: {
        title: "Colunas",
        titleAria: "Visualizar/Esconder colunas",
      },
      selectedRows: {
        text: "Linha(s) selecionadas",
        delete: "Deletar",
        deleteAria: "Deletar linhas selecionadas",
      },

    },
    draggableColumns: {
      enabled: true
    },

    ...props.options
  };

  const columns: MUIDataTableColumnDef[] = [
    { name: 'id', options: { print: false, display: 'excluded' } },
    ...props.columns,
    { name: 'created_at', label: 'Data de criação', options: { print: false, display: 'false', draggable: true } },
    { name: 'updated_at', label: 'Atualizado em', options: { print: false, display: 'false', draggable: true } },

  ]
  return (
    <MUIDataTable columns={columns} data={props.data} title={props.title} options={options} />
  )

}

export default DataTable
