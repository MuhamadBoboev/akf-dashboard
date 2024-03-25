import { Products } from '@modules/product'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next/types'
import { getCategories, ICategory } from '@modules/catalog'

type Props = {
  categories: ICategory[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const categories = await getCategories()
  // const providers = await getProviders()
  // const collections = await getCollections()

  return {
    props: {
      categories: categories || [],
      // providers: providers || [],
      // collections: collections || [],
    }
  }
}

function Page({ categories }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <Products
      categories={categories}
    // providers={providers}
    // collections={collections}
    />
  )
}

export default Page
