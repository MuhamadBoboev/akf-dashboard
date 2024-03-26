import { Control, Controller, FieldErrors, UseFormGetValues, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { UpdateProductFormData } from '@modules/product/model/updateProduct/UpdateProductFormData'
import Grid from '@mui/material/Grid'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import Typography from '@mui/material/Typography'
import { EditorWrapper } from '../../../../@core/styles/libs/react-draft-wysiwyg'
import ReactDraftWysiwyg from '../../../../@core/components/react-draft-wysiwyg'
import { useEffect, useMemo, useState } from 'react'
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import ModalFormControl from '@shared/ui/ModalFormControl'
import InputLabel from '@mui/material/InputLabel'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import { stateFromHTML } from 'draft-js-import-html'
import { stateToHTML } from 'draft-js-export-html'
import { ICategory, ISubcategory } from '@modules/catalog'
import { langSelector, useLanguageStore } from '@shared/model/store'
import DateTimePickerCustom from '@shared/ui/DatePickerCustom'


interface Props {
  description: string | null
  errors: FieldErrors<UpdateProductFormData>
  control: Control<UpdateProductFormData>
  setValue: UseFormSetValue<UpdateProductFormData>
  getValues: UseFormGetValues<UpdateProductFormData>
  watch: UseFormWatch<UpdateProductFormData>
}

function UpdateProductForm({ description, errors, control, setValue, watch, getValues }: Props) {
  const [descriptionState, setDescriptionState] = useState(
    EditorState.createWithContent(stateFromHTML(description || ''))
  )
  const lang = useLanguageStore(langSelector)
  const { data: categoriesData } = useSWR<ICategory[]>(`/category/get?lang=${lang}`, getFetcher)

  useEffect(() => {
    setValue(
      'content',
      stateToHTML(descriptionState.getCurrentContent())
    )
  }, [descriptionState])

  if (!categoriesData) {
    return null
  }

  return (
    <Grid
      container
      spacing={6}
      py={4}
      boxSizing="border-box"
    >
      <Grid item xs={12}>
        <TextFieldCustom
          name="title"
          control={control}
          label="Название"
          errorMessage={errors.title?.message}
          required
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>Описание</Typography>
        <EditorWrapper>
          <ReactDraftWysiwyg
            editorState={descriptionState}
            onEditorStateChange={data => setDescriptionState(data)}
          />
          <Controller
            name="content"
            control={control}
            render={({ field }: any) => (
              <input
                type="hidden"
                {...field}
              />
            )}
          />
        </EditorWrapper>
      </Grid>
      <Grid item xs={6}>
        <TextFieldCustom
          name="link_video"
          control={control}
          label="Ссылка"
          errorMessage={errors.link_video?.message}
          required
        />
      </Grid>

      <Grid item xs={6}>
        <DateTimePickerCustom
          name="date"
          control={control}
          label="Выберите дату и время"
          required
          valueDate={getValues('date')}
        />

      </Grid>
    </Grid>
  )
}

export { UpdateProductForm }
