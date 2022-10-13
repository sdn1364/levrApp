import { selectNewLoanApplicationModal, setCloseNewLoanApplicationModal } from 'redux/reducer/loanApplication/loanApplicationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useGetAllOrganizationsQuery } from 'redux/reducer/organizations/organizationsApiSlice'
import { usePermission } from 'hooks'
import { useForm } from '@mantine/form'
import { emptyInvitations, selectInvitations, setInvitationLoading, unsetInvitationLoading } from 'redux/reducer/ManageAccessSlice'
import { useCreateLoanApplicationMutation, useSendLoanAppInvitationsMutation } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { showNotification } from '@mantine/notifications'

const useNewLoanApplicationModal = () => {
  const dispatch = useDispatch()
  const [active, setActive] = useState(0)
  const { data, isSuccess } = useGetAllOrganizationsQuery()
  const invitations = useSelector(selectInvitations)
  const [sendInvitation] = useSendLoanAppInvitationsMutation()
  const [createNewLoanApp] = useCreateLoanApplicationMutation()

  const form = useForm({
    initialValues: {
      org_id: '',
      loan_description: '',
      requested_amount: ''
    },
    validate: {
      org_id: value => value !== '' ? null : 'This Field must not be empty',
      loan_description: value => value !== '' ? null : 'This Field must not be empty',
      requested_amount: value => value !== '' ? null : 'This Field must not be empty'
    }
  })

  const { hasAccessToOrganization } = usePermission({})

  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current))
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

  const opened = useSelector(selectNewLoanApplicationModal)

  const closeNewLoanApplicationModal = () => {
    dispatch(setCloseNewLoanApplicationModal())
    setActive(0)
    dispatch(emptyInvitations())
    form.reset()
  }

  const allOrganizations = () => {
    const organizations = []
    if (isSuccess) {

      // eslint-disable-next-line array-callback-return
      data.map(val => {
        if (hasAccessToOrganization(val.id)) {
          organizations.push({ value: val.id, label: val.name })
        }
      })
    }

    return organizations
  }

  const createNewLoanApplication = async (values) => {
    await createNewLoanApp(values).unwrap()
      .then(res => {
        if (invitations.length > 0) {
          handleSendInvitation(res.id)
        }
        closeNewLoanApplicationModal()
        showNotification({
          title: 'New loan application created',
          color: 'green'
        })
      }).catch(err => {
        showNotification({
          title: 'Something went wrong',
          color: 'red'
        })
      })
  }

  const handleSendInvitation = async (loanAppId) => {
    dispatch(setInvitationLoading())
    await sendInvitation({ id: loanAppId, userRoles: invitations }).unwrap()
      .then(res => {
        showNotification({
          title: 'Invitations Sent',
          color: 'green'
        })
        dispatch(emptyInvitations())
        dispatch(unsetInvitationLoading())
      }).catch(error => {
        console.log(error)
        error.data.user_roles.forEach(err => {
          showNotification({
              title: 'Error sending invitations',
              message: err.email,
              color: 'red'
            }
          )
        })
      })
  }

  return {
    opened, active, setActive, form,
    nextStep,
    prevStep,
    closeNewLoanApplicationModal,
    allOrganizations,
    createNewLoanApplication
  }
}
export default useNewLoanApplicationModal
