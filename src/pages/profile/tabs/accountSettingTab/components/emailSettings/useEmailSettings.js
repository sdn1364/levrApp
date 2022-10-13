import { useGetUserQuery, useUpdateUserEmailMutation } from 'redux/reducer/auth/authApiSlice'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'

const useEmailSettings = () => {
  const { data: user, isSuccess } = useGetUserQuery()
  const [updateUserEmail] = useUpdateUserEmailMutation()
  const form = useForm({
    initialValues: {
      email: isSuccess ? user.email : '',
      password: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => value === undefined ? 'Password can not be empty' : null
    }
  })

  const handleUpdateUserEmail = async ({ email, password }) => {
    console.log({ email, password })
    await updateUserEmail({
      userId: user.id,
      userEmail: email,
      confirmPassword: password
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'User Email updated',
          color: 'green'
        })
      }).catch(err => console.log(err.data.email))
  }

  return { user, handleUpdateUserEmail, form, isSuccess }
}

export default useEmailSettings
