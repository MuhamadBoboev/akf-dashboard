import CustomCard from '@shared/ui/CustomCard'
import Typography from '@mui/material/Typography'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { CreateProductFormData, createProductScheme } from '@modules/product/model/createProduct/CreateProductFormData'
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid'
import { FileUploader } from '@shared/ui/FileUploader'
import { useEffect, useMemo, useState } from 'react'
import TextFieldCustom from '@shared/ui/TextFieldCustom'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { EditorState } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorWrapper } from '../../../../@core/styles/libs/react-draft-wysiwyg'
import { stateToHTML } from 'draft-js-export-html'
import useSWR from 'swr'
import { getFetcher } from '@shared/api/fetcher/getFetcher'
import InputLabel from '@mui/material/InputLabel'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import ModalFormControl from '@shared/ui/ModalFormControl'
import { ICategory, ISubcategory } from '@modules/catalog'
import { LoadingButton } from '@mui/lab'
import useSWRMutation from 'swr/mutation'
import { postFetcher } from '@shared/api/fetcher/postFetcher'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { IProductType } from '@modules/productType'
import { langSelector, useLanguageStore } from '@shared/model/store'
import DateTimePickerCustom from '@shared/ui/DatePickerCustom'


function CreateProduct() {
  const [image, setImage] = useState<File[]>([])
  const [content, setContent] = useState(EditorState.createEmpty())
  const lang = useLanguageStore(langSelector)
  const { data: categoriesData } = useSWR<ICategory[]>(`/category/get?lang=${lang}`, getFetcher)
  const { trigger, isMutating } = useSWRMutation('/news/create', postFetcher)

  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    setError,
    reset,
  } = useForm<CreateProductFormData>({
    mode: 'onBlur',
    defaultValues: {
      category_id: null,
    },
    resolver: yupResolver(createProductScheme)
  })
  const router = useRouter()

  useEffect(() => {
    setValue('content', stateToHTML(content.getCurrentContent()))
  }, [content])

  const onSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
    const categoryId = getValues('category_id')
    if (!categoryId) {
      setError('category_id', {
        message: 'Выберите категорию или коллекцию'
      })
      return
    }
    try {
      const formData: any = {
        ...data,
        img: image[0],
      }
      if (data.category_id) {
        formData.category_id = formData.category_id
      }

      const response = await trigger(formData)
      toast.success(response.message)
      reset({
        category_id: null,
        content: null,
        date: null,
        img: '',
        title: '',
      })
      // router.push(`/main/products/${response.product.slug}`)
      router.push(`/main/products/`)
    } catch (e) {
      const error = e as AxiosError<{ message: string }>
      toast.error(error.response?.data.message || 'Произошла ошибка')

    }
  }

  if (!categoriesData) {
    return null
  }


  return (
    <CustomCard>
      <Typography
        variant="h5"
        component="h1"
        mt={8}
        ml={8}
      >
        Добавить товар
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={5}
          p={8}
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
                editorState={content}
                onEditorStateChange={data => setContent(data)}
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
            <ModalFormControl errorMessage={errors.category_id?.message}>
              <InputLabel id="select-category">Категория *</InputLabel>
              <Controller
                name="category_id"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="select-category-label"
                    id="select-category"
                    label="Поставщик *"
                    {...field}
                    required
                    onChange={(event) => {
                      if (field.onChange) {
                        field.onChange(event)
                      }
                      if (event.target.value) {
                        const selected = Number(event.target.value)
                        if (selected) {
                          setValue('category_id', selected)
                        }
                      }
                    }}
                  >
                    {categoriesData.map(({ id, name }) => (
                      <MenuItem key={id} value={id}>{name}</MenuItem>
                    ))}
                  </Select>
                )}
              />
            </ModalFormControl>
          </Grid>

          <Grid item xs={6}>
            <DateTimePickerCustom
              name="date"
              control={control}
              label="Выберите дату и время"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FileUploader
              name="img"
              control={control}
              setValue={setValue}
              files={image}
              setFiles={setImage}
              errorMessage={errors.img?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              loading={isMutating}
              disabled={isMutating}
            >
              Отправить
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </CustomCard>
  )
}

export { CreateProduct }
