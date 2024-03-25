import useSWRMutation from 'swr/mutation'
import { deleteFetcher } from '@shared/api/fetcher/deleteFetcher'
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid'
import { LinearProgress } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { KeyedMutator } from 'swr'
import { IProductsData } from '@modules/product/model/IProduct'
import { productColumns } from '@modules/product/model/productColumns'
import { PaginationModelType } from '@shared/lib/PaginationModelType'

interface Props {
  loading: boolean
  products?: IProductsData
  paginationModel: PaginationModelType
  setPaginationModel: Dispatch<SetStateAction<PaginationModelType>>
  mutate: KeyedMutator<any>
  rowSelectionModel: GridRowSelectionModel
  setRowSelectionModel: Dispatch<SetStateAction<GridRowSelectionModel>>
}

function ProductsTable({
  products,
  loading,
  paginationModel,
  setPaginationModel,
  mutate,
  rowSelectionModel,
  setRowSelectionModel
}: Props) {
  const { trigger } = useSWRMutation('/news/delete', deleteFetcher)

  return (
    <DataGrid
      slots={{ loadingOverlay: LinearProgress }}
      loading={loading}
      columns={productColumns({ trigger, mutate })}
      rows={products?.data.news || []}
      pagination={true}
      paginationModel={paginationModel}
      pageSizeOptions={[5, 10, 15, 20, 25, 30, 35]}
      paginationMode="server"
      onPaginationModelChange={async (model) => {
        setPaginationModel(model)
        await mutate(products, {
          revalidate: true,
        })
      }}
      rowSelection={true}
      disableRowSelectionOnClick
      checkboxSelection
      onRowSelectionModelChange={(newRowSelectionModel) => {
        setRowSelectionModel(newRowSelectionModel)
      }}
      rowSelectionModel={rowSelectionModel}
      keepNonExistentRowsSelected
      rowCount={products?.meta?.total}
      autoHeight
      localeText={{
        noRowsLabel: 'Пусто'
      }}
    />
  )
}

export { ProductsTable }
