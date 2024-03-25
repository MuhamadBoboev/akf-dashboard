import * as yup from 'yup'
import { getMaxLengthErrorMessage } from '@shared/lib/getMaxLengthErrorMessage'

export interface UpdateProductFormData {
  category_id: number
  content?: string | null
  date?: string | null
  img: string
  title: string
}

type FormType = yup.ObjectSchema<UpdateProductFormData, yup.AnyObject>

export const updateProductScheme: FormType = yup.object().shape({
  title: yup.string()
    .max(255, getMaxLengthErrorMessage())
    .required('Введите название товара'),
  content: yup.string().nullable(),
  img: yup.string().required(),
  date: yup.string().required('Выберите дату'),
  category_id: yup.number().required()
})

