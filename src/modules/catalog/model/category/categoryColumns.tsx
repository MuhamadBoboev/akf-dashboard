import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import toast from 'react-hot-toast'
import { ICategory } from '@modules/catalog'
import Link from 'next/link'
import { KeyedMutator } from 'swr'
import Button from '@mui/material/Button'
import { useLanguageStore } from '@shared/model/store'

interface Props {
  handleUpdateOpen(data: ICategory): void
  mutate: KeyedMutator<any>
  trigger(id: number): Promise<any>
}

export function categoryColumns({ handleUpdateOpen, trigger, mutate }: Props): GridColDef<ICategory>[] {
  const { lang } = useLanguageStore(({ lang }) => ({ lang }))

  return [
    { field: 'id', headerName: '#', width: 80 },
    { field: 'name', headerName: 'Название', flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      width: 300,
      getActions: ({ row }) => [
        <Link style={{ marginRight: 8 }} href={`/main/categories/${row.id}`}>
          <Button variant="outlined">Новости</Button>
        </Link>,
        <GridActionsCellItem
          title="Изменить"
          label="Изменить"
          icon={<EditIcon sx={{ fontSize: 24 }} />}
          onClick={() => {
            handleUpdateOpen(row)
          }}
        />,
        <GridActionsCellItem
          label="Удалить"
          title="Удалить"
          icon={<DeleteIcon sx={{ fontSize: 24 }} />}
          onClick={async () => {
            try {
              const response = await trigger(row.id)
              await mutate()
              toast.success('Успешно удалено!')
            } catch (e) {
              toast.error('Произошла ошибка')
            }
          }}
        />
      ]
    }
  ]
}
