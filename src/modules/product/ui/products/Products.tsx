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
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Button, Grid } from '@mui/material'

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
  const router = useRouter()
  const {
    data: products,
    isValidating,
    isLoading,
    error,
    mutate,
  } = useSWR<[IProductsData]>(`/category/get-by-id/${router.query.id}?lang=${lang}&page=${paginationModel.page + 1}&per_page=${paginationModel.pageSize}${search ? `&search=${search}` : ''}` + query, getFetcher, {
    keepPreviousData: true,
  })


  // useEffect(() => {
  //   if (products) {
  //     if (paginationModel.page > 0) {
  //       if (products.meta.total === 0) {
  //         setPaginationModel({
  //           ...paginationModel,
  //           page: paginationModel.page - 1,
  //         })
  //       }
  //     }
  //   }
  // }, [paginationModel, products])

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
        alignItems="end"
        justifyContent="space-between"
        p={5}
      >
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={8}>
            <Typography
              variant="h5"
              component="h1"
            >
              Новости категории "{products && products[0].name}"
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Link style={{ marginRight: 8 }} href={`/main/categories`}>
              <Button variant="outlined">Вернуться назад</Button>
            </Link>
          </Grid>
        </Grid>
        <Link style={{ marginRight: 8 }} href={`/main/categories/create/${router.query.id}`}>
          <Button variant="outlined">Добавить новость</Button>
        </Link>
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
