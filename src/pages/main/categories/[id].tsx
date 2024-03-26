import { Products } from '@modules/product'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import { getCategories, ICategory } from '@modules/catalog'

type Props = {
  categories: ICategory[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const categories = await getCategories()

  return {
    props: {
      categories: categories || []
    }
  }
}

function Page({ categories }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <Products
      categories={categories}
    />
  )
}

export default Page
