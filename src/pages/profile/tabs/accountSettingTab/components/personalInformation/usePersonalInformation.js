import { useGetUserQuery, useUpdateUserFullNameMutation } from 'redux/reducer/auth/authApiSlice'
import { showNotification } from '@mantine/notifications'
import { useForm } from '@mantine/form'

const usePersonalInformation = () => {

  const [updateFullName] = useUpdateUserFullNameMutation()
  const { data: user, isSuccess, isLoading } = useGetUserQuery()

  const form = useForm({
    initialValues: {
      fullName: (isSuccess ? user.full_name : '')
    },
    validate: {
      fullName: value => value === null || value === '' ? 'This field should not be empty' : null
    }
  })
  
  const handleUpdateName = async ({ fullName }) => {
    await updateFullName({
      userId: user.id,
      userFullName: fullName
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'User\'s Full Name changed',
          color: 'green'
        })
      }).catch(err => {
        showNotification({
          title: err,
          color: 'red'
        })
      })
  }


  return { handleUpdateName, user, isSuccess, isLoading, form }
}

export default usePersonalInformation
