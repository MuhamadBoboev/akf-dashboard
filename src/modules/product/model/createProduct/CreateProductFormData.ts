import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface CreateProductFormData {
  category_id?: number | null
  content?: string | null
  date: string
  img: string
  title: string
  link_video?: string | null
}

type FormType = yup.ObjectSchema<CreateProductFormData, yup.AnyObject>

export const createProductScheme: FormType = yup.object().shape({
  title: yup.string()
  .max(255, getMaxLengthErrorMessage())
  .required('Введите название товара'),
  content: yup.string().nullable(),
  img: yup.string().required(),
  date: yup.string().required('Выберите дату'),
  category_id: yup.number().nullable(),
  link_video: yup.string().nullable()
})
