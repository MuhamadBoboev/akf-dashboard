import { IPagination } from '@shared/model/IPagination'


export interface IProduct {
  category_id: number
  content: string
  date: string
  id: number
  img: string
  title: string
}

export interface IProductsData extends IPagination {
  data: {
    count: number
    news: IProduct[]
  }
}

