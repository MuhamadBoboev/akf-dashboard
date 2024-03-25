import CustomCard from '@shared/ui/CustomCard'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Loader from '@shared/ui/Loader'
import Typography from '@mui/material/Typography'
import { IProduct } from '@modules/product'
import Box from '@mui/material/Box'
import { Tab } from '@mui/material'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { UpdateProductMain } from '@modules/product/ui/updateProduct/UpdateProductMain'
import { notFound } from 'next/navigation'

function UpdateProduct() {
  const router = useRouter()
  const {
    data: product,
    isLoading,
    mutate,
    isValidating,
    error,
  } = useSWR<IProduct>(`/news/get-by-id/${router.query.id}`, getFetcher)


  if (isLoading || isValidating || !product) {
    return <Loader />
  }

  if (error) {
    notFound()
  }

  return (
    <CustomCard>
      <Typography
        component="h1"
        variant="h5"
        mt={10}
        ml={10}
      >{product.title}</Typography>
      <Box px={10} mt={5} mb={10}>
        <Tab label="Основное" value="main" />
      </Box>
      <Box px={10} mb={5} pb={5}>
        {product && <UpdateProductMain
          product={product}
          mutate={mutate}
        />}
      </Box>
    </CustomCard>
  )
}

export { UpdateProduct }
