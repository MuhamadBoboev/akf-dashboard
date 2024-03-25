import CustomCard from '@shared/ui/CustomCard'
import Typography from '@mui/material/Typography'
import useSWR from 'swr'
import { useEffect, useState } from 'react'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { IProductsData } from '@modules/product/model/IProduct'
import Box from '@mui/material/Box'
import { ProductsTable } from '@modules/product/ui/products/ProductsTable'
import Error500 from '../../../../pages/500'
import { ICategory } from '@modules/catalog'
import { GridRowSelectionModel } from '@mui/x-data-grid'
import { ProductsActiveModal } from '@modules/product/ui/products/ProductsActiveModal'
import { langSelector, useLanguageStore } from '@shared/model/store'

interface Props {
  categories: ICategory[]
}

function Products({ categories }: Props) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  })
  /** @filter */
  const [search, setSearch] = useState('')
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([])
  const [query, setQuery] = useState('')
  const [activeModal, setActiveModal] = useState(false)
  const lang = useLanguageStore(langSelector)
  const {
    data: products,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<IProductsData>(`/news/get?lang=${lang}&page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}${search ? `&search=${search}` : ''}` + query, getFetcher, {
    keepPreviousData: true,
  })

  useEffect(() => {
    if (products) {
      if (paginationModel.page > 0) {
        if (products.meta.total === 0) {
          setPaginationModel({
            ...paginationModel,
            page: paginationModel.page - 1,
          })
        }
      }
    }
  }, [paginationModel, products])

  if (error) {
    return <Error500 />
  }

  return (
    <CustomCard
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        component="header"
        mb={5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={5}
      >
        <Typography
          variant="h5"
          component="h1"
        >
          Товары
        </Typography>
        {activeModal && (
          <ProductsActiveModal
            close={() => setActiveModal(false)}
            rowSelectionModel={rowSelectionModel}
            setRowSelectionModel={setRowSelectionModel}
            mutate={mutate}
          />
        )}
      </Box>
      <ProductsTable
        mutate={mutate}
        loading={isLoading || isValidating}
        setPaginationModel={setPaginationModel}
        paginationModel={paginationModel}
        products={products}
        rowSelectionModel={rowSelectionModel}
        setRowSelectionModel={setRowSelectionModel}
      />
    </CustomCard>
  )
}

export { Products }
