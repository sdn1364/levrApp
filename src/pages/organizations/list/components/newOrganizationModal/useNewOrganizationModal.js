import { useForm } from '@mantine/form'
import { useDispatch, useSelector } from 'react-redux'
import { selectNewOrganizationModal, setCloseNewOrganizationModal } from 'redux/reducer/organizations/organizationsSlice'
import { showNotification } from '@mantine/notifications'
import { useCreateOrganizationMutation } from 'redux/reducer/organizations/organizationsApiSlice'

const useNewOrganizationModal = () => {
  const dispatch = useDispatch()
  const opened = useSelector(selectNewOrganizationModal)
  const [setOrganization] = useCreateOrganizationMutation()

  const form = useForm({
    initialValues: {
      name: '',
      org_type: ''
    },
    validate: {
      name: (value) => value.length > 0 ? null : 'The Name input must not be empty',
      org_type: value => value !== '' ? null : 'Please select organization type'
    }
  })

  const createNewOrganization = async (data) => {
    await setOrganization(data).unwrap()
      .then(res => {
        showNotification({
          title: 'New Organization',
          message: 'New organization created',
          color: 'green'
        })
        closeNewOrganizationModal()
      })
      .catch(error => {
        if (error?.data?.name) {
          showNotification({
            title: 'Cannot Create new organization!',
            message: error.data.name,
            color: 'red'
          })
        }
      })
  }
  const closeNewOrganizationModal = () => {
    dispatch(setCloseNewOrganizationModal())
  }
  return { opened, form, closeNewOrganizationModal, createNewOrganization }
}
export default useNewOrganizationModal