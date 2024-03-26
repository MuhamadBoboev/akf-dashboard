// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Категории',
      path: '/main/categories',
      icon: 'ep:menu'
    },
    // {
    //   title: 'Новости',
    //   icon: 'fluent-mdl2:product',
    //   children: [
    //     {
    //       title: 'Все новости',
    //       path: '/main/products',
    //     },
    //     {
    //       title: 'Добавить новость',
    //       path: '/main/products/create',
    //     }
    //   ]
    // },
  ]
}

export default navigation
