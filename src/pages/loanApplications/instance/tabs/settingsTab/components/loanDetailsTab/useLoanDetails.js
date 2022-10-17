import { useGetOneLoanApplicationQuery, useUpdateLoanAppAmountMutation, useUpdateLoanAppDescriptionMutation, useUpdateLoanAppNoteMutation } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { useParams } from 'react-router-dom'
import { showNotification } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { useDispatch } from 'react-redux'
import { openLoanAppDeleteModal } from '../../../../../../../redux/reducer/loanApplication/loanApplicationSlice'

const useLoanDetails = () => {
  const { id: loanAppId } = useParams()
  const { data: loanApp, isSuccess } = useGetOneLoanApplicationQuery(loanAppId)

  const dispatch = useDispatch()
  const [updateDescription] = useUpdateLoanAppDescriptionMutation()
  const [updateAmount] = useUpdateLoanAppAmountMutation()
  const [updateNote] = useUpdateLoanAppNoteMutation()
  const descriptionForm = useForm({
    initialValues: {
      description: isSuccess ? loanApp.loan_description : ''
    }
  })
  const amountForm = useForm({
    initialValues: {
      amount: isSuccess ? loanApp.requested_amount : ''
    },
    validate: {
      amount: (value => value !== '' ? (isNaN(value) ? 'Please add a valid number as Requested amount' : null) : 'Requested amount of Loan can not be empty')
    }
  })
  const noteForm = useForm({
    initialValues: {
      note: isSuccess ? (loanApp.note ?? '') : ''
    }

  })

  const handelUpdateDescription = async ({ description }) => {
    await updateDescription({
      loanAppId: loanAppId,
      description: description
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'Loan Application name updated',
          color: 'green'
        })
      }).catch(err => console.log(err))
  }
  const handleUpdateAmount = async ({ amount }) => {
    await updateAmount({
      loanAppId: loanAppId,
      amount: amount
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'Loan Application Requested Amount updated',
          color: 'green'
        })
      }).catch(err => console.log(err))
  }
  const handleUpdateNote = async ({ note }) => {
    await updateNote({
      loanAppId: loanAppId,
      note: note
    }).unwrap()
      .then(res => {
        showNotification({
          title: 'Loan Application Note updated',
          color: 'green'
        })
      }).catch(err => console.log(err))
  }
  const handleOpenLoanAppDeleteModal = (id) => {
    dispatch(openLoanAppDeleteModal(id))
  }
  return {
    isSuccess,
    loanApp,
    descriptionForm,
    amountForm,
    noteForm,
    handelUpdateDescription,
    handleUpdateAmount,
    handleUpdateNote,
    handleOpenLoanAppDeleteModal
  }
}

export default useLoanDetails
