import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import Switch from '@mui/material/Switch'
import CustomDialog from '@shared/ui/CustomDialog/CustomDialog'
import { GridRowSelectionModel } from '@mui/x-data-grid'
import FormControlLabel from '@mui/material/FormControlLabel'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'
import { KeyedMutator } from 'swr'
import { axiosInstance } from '@shared/api/axiosInstance'

interface Props {
  close(): void

  rowSelectionModel: GridRowSelectionModel
  setRowSelectionModel: Dispatch<SetStateAction<GridRowSelectionModel>>
  mutate: KeyedMutator<any>
}

function ProductsActiveModal({rowSelectionModel, setRowSelectionModel, close, mutate}: Props) {
  const [checked, setChecked] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const onSubmit = async () => {
    try {
      setIsLoading(true)
      await axiosInstance.patch('/products/update-active', {
        product_ids: rowSelectionModel,
        is_active: checked,
      })
      await mutate()
      setIsLoading(false)
      toast.success('Успешно отправлно')
      setRowSelectionModel([])
      close()
    } catch (e) {
      setIsLoading(false)
      toast.error('Произошла ошибка')
    }
  }

  return (
    <CustomDialog
      title="Изменить активность выбранных товаров"
      handleClose={close}
    >
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            name="Активный"
          />
        }
        label="Активный"
      />
      <LoadingButton
        fullWidth
        type="submit"
        variant="contained"
        size="large"
        loading={isLoading}
        disabled={isLoading}
        onClick={onSubmit}
      >
        Отправить
      </LoadingButton>
    </CustomDialog>
  )
}

export { ProductsActiveModal }
