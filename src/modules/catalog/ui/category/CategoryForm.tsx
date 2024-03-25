import { Control, Controller, FieldErrors } from 'react-hook-form'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import { CategoryFormData } from '@modules/catalog/model/category/CategoryFormData'
// import { IService } from '@modules/service'
import InputLabel from '@mui/material/InputLabel'
import { FormControl, Select, SelectChangeEvent } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import ModalFormControl from '@shared/ui/ModalFormControl'
import { langIdSelector, useLanguageStore } from '@shared/model/store'
import { useState } from 'react'
import { ILang } from '@shared/model/ILang'
import { langSelector } from '../../../../shared/model/store';
import { LangForm } from '@shared/ui/LangForm'
// import { SelectLanguage } from '@shared/ui/SelectLanguage'

interface Props {
  services: any
  errors: FieldErrors<CategoryFormData>
  control: Control<CategoryFormData>
  // images: File[]
  // setImages: Dispatch<SetStateAction<File[]>>
  // setValue: UseFormSetValue<CategoryFormData>
}

function CategoryForm({ control, errors, services }: Props) {

  return (
    <>
      <TextFieldCustom
        name="name"
        control={control}
        label="Название"
        errorMessage={errors.name?.message}
        required
      />
    </>
  )
}

export { CategoryForm }
