import { useUpdateOrganizationNameMutation, useUpdateOrganizationTypeMutation, useDeleteOrganizationMutation, useGetOneOrganizationQuery } from 'redux/reducer/organizations/organizationsApiSlice'
import { showNotification } from '@mantine/notifications'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from '@mantine/form'


const useOrganizationsInformation = () => {

  const [updateOrganizationName] = useUpdateOrganizationNameMutation()
  const [updateOrganizationType] = useUpdateOrganizationTypeMutation()
  const [deleteOrganization] = useDeleteOrganizationMutation()
  const { id } = useParams()
  const { data: organization, isSuccess, isLoading } = useGetOneOrganizationQuery(id)

  const nameForm = useForm({
    initialValues: {
      name: organization?.name
    }
  })
  const typeForm = useForm({
    initialValues: {
      org_type: organization?.org_type
    }
  })
  const navigation = useNavigate()
  const orgTypes = [
    { value: '', label: 'Select' },
    { value: 'ORG_BORROWER', label: 'Borrower' },
    { value: 'ORG_BROKER', label: 'Brokerage' },
    { value: 'ORG_LENDER', label: 'Lender' }
  ]
  const handleUpdateOrganizationName = async (data) => {
    await updateOrganizationName({ id, name: data.name }).unwrap()
      .then(res => {
        showNotification({
          title: 'Organization Updated',
          message: 'Organization name updated',
          color: 'green'
        })
      }).catch(error => {
        if (error?.data?.name) {
          showNotification({
            title: 'Cannot Update organization!',
            message: error.data.name,
            color: 'red'
          })
        }
      })
  }

  const handleUpdateOrganizationType = async (data) => {
    await updateOrganizationType({ id, org_type: data.org_type }).unwrap()
      .then(res => {
        showNotification({
          title: 'Organization updated',
          message: 'Organization type updated',
          color: 'green'
        })
      }).catch(error => {
        console.log(error)
      })
  }

  const handleDeleteOrganization = async () => {
    await deleteOrganization(id).unwrap()
      .then(res => {

        navigation('/organizations')

      })
      .catch(error => console.log(error))
  }


  return { isSuccess, isLoading, nameForm, typeForm, orgTypes, handleUpdateOrganizationName, handleUpdateOrganizationType, handleDeleteOrganization }
}

export default useOrganizationsInformation