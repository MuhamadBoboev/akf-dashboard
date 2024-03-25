import { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { updateFetcher } from '@shared/api/fetcher/updateFetcher'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UpdateProductFormData, updateProductScheme } from '@modules/product/model/updateProduct/UpdateProductFormData'
import ImageContainer from '@shared/ui/ImageContainer'
import { IProduct } from '@modules/product'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import { KeyedMutator } from 'swr'
import { AxiosError, AxiosResponse } from 'axios'
import { UpdateProductForm } from '@modules/product/ui/updateProduct/UpdateProductForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { setProductDefaultValues } from '@modules/product/lib/setProductDefaultValues'
import { FileUploader } from '@shared/ui/FileUploader'
import { updateFetcherNews } from '@shared/api/fetcher/updateFetcherNews'
import { getFetcher } from '@shared/api/fetcher/getFetcher'

interface Props {
  product: IProduct
  mutate: KeyedMutator<any>
}

function UpdateProductMain({ product, mutate }: Props) {
  const [images, setImages] = useState<File[]>([])
  // const [images, setImages] = useState<File[]>([])

  const [image, setImage] = useState<string | null>(null)
  const { trigger, isMutating, reset } = useSWRMutation(['/news/update', product.id], updateFetcher)
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useForm<UpdateProductFormData>({
    mode: 'onBlur',
    defaultValues: setProductDefaultValues(product),
    resolver: yupResolver(updateProductScheme)
  })


  const onSubmit: SubmitHandler<UpdateProductFormData> = async (data) => {
    try {
      const formData: any = {
        ...data,
        img: images[0]
      }
      // if (data.category_id && data.category_id) {
      //   formData.category_id = formData.category_id[0]
      // }

      const { message } = await trigger(formData)
      toast.success(message)
      await mutate()
      reset()
      // setImage(null)
    } catch (e) {
      const { response } = e as AxiosError<{ message: string }>
      toast.error(response?.data?.message || 'Произошла ошибка')
    }
  }


  useEffect(() => {
    async function loadImage() {
      try {
        const response = await fetch(product.img);
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const blob = await response.blob();
        setImages([new File([blob], 'image.png', { type: 'image/png' })]);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    }

    loadImage();
  }, [product.img]);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <FileUploader
        title="Выберите иконку"
        files={images}
        setFiles={setImages}
        errorMessage={errors.img?.message}
        control={control}
        setValue={setValue}
        name="img"
      />
      {/* <ImageContainer
        urlImage={product.img}
        image={image}
        setImage={setImage}
        control={control}
        errorMessage={errors.img?.message}
      /> */}
      <UpdateProductForm
        errors={errors}
        control={control}
        description={product.content}
        setValue={setValue}
        getValues={getValues}
        watch={watch}
      />
      <LoadingButton
        loading={isMutating}
        disabled={isMutating}
        fullWidth
        type="submit"
        size="large"
        variant="contained"
        sx={{ mt: 5 }}
      >
        Отправить
      </LoadingButton>
    </form>
  )
}

export { UpdateProductMain }
