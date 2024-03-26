import { IPagination } from '@shared/model/IPagination'


export interface IProduct {
  category_id: number
  content: string
  date: string
  id: number
  img: string
  title: string
  link_video: string
}

export interface IProductsData extends IPagination {
  id: number
  lang_id: number
  name: string
  news: IProduct[]

}

