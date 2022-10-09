import { useDispatch, useSelector } from 'react-redux'
import { useCreateOrganizationMutation, useGetAllOrganizationsQuery } from 'redux/reducer/organizations/organizationsApiSlice'
import { showNotification } from '@mantine/notifications'
import { selectNewOrganizationModal, setCloseNewOrganizationModal, setOpenNewOrganizationModal } from 'redux/reducer/organizations/organizationsSlice'
import { useForm } from '@mantine/form'


const useOrganizationList = () => {
  const { data: organizations, isSuccess, isLoading } = useGetAllOrganizationsQuery()

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

  const dispatch = useDispatch()
  const opened = useSelector(selectNewOrganizationModal)

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

  const openNewOrganizationModal = () => {
    dispatch(setOpenNewOrganizationModal())
  }
  const closeNewOrganizationModal = () => {
    dispatch(setCloseNewOrganizationModal())
  }

  return { organizations, isSuccess, isLoading, form, opened, createNewOrganization, openNewOrganizationModal, closeNewOrganizationModal }
}
export default useOrganizationList
