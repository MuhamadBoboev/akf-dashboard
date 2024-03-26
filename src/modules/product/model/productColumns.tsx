import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { IProduct } from '@modules/product'
import Avatar from '@mui/material/Avatar'
import { KeyedMutator } from 'swr'

interface Props {
  trigger(id: number): Promise<any>
  mutate: KeyedMutator<any>
}

export function productColumns({ trigger, mutate }: Props): GridColDef<IProduct>[] {
  return [
    { field: 'id', headerName: '#', width: 80 },
    {
      field: 'img',
      headerName: 'Изображение',
      width: 120,
      renderCell: ({ row: { title, img } }) => (
        <Avatar
          src={img}
          alt={title}
        />
      )
    },
    { field: 'title', headerName: 'Название', minWidth: 120, flex: 2 },
    // { field: 'link_video', headerName: 'Ссылка', minWidth: 120, flex: 2 },
    // {
    //   field: 'category_id',
    //   headerName: 'Категория',
    //   flex: 1,
    //   renderCell: ({ row: { category_id } }) => <>{category_id}</>
    // },
    { field: 'date', headerName: 'Дата', flex: 2 },
    {
      field: 'actions',
      type: 'actions',
      width: 150,
      getActions: ({ row }) => [
        <Link href={`/main/products/${row.id}`}>
          <GridActionsCellItem
            title="Изменить"
            label="Изменить"
            icon={<EditIcon sx={{ fontSize: 24 }} />}
          />
        </Link>,
        <GridActionsCellItem
          label="Удалить"
          title="Удалить"
          icon={<DeleteIcon sx={{ fontSize: 24 }} />}
          onClick={async () => {
            try {
              const response = await trigger(row.id)
              toast.success(response.message)
              await mutate()
            } catch (e) {
              const error = e as AxiosError<{ message: string }>
              toast.error(error.response?.data.message || 'Произошла ошибка')
            }
          }}
        />
      ]
    }
  ]
}
