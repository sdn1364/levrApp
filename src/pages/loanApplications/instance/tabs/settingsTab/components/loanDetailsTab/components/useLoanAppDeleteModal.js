import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { closeLoanAppDeleteModal } from 'redux/reducer/loanApplication/loanApplicationSlice'
import { useDeleteLoanAppMutation } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { showNotification } from '@mantine/notifications'

const useLoanAppDeleteModal = () => {
  const { id: loanAppId } = useParams()
  const [deleteLoanApp] = useDeleteLoanAppMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleCloseLoanAppDeleteModal = () => {
    dispatch(closeLoanAppDeleteModal())
  }
  const handleDeleteLoanApp = async () => {
    await deleteLoanApp(loanAppId).unwrap()
      .then(res => {
        showNotification({
          title: 'Loan Application Deleted',
          color: 'blue'
        })
        navigate('/loan-applications')
      }).catch(err => console.log(err))
  }
  return {
    handleDeleteLoanApp,
    handleCloseLoanAppDeleteModal
  }
}

export default useLoanAppDeleteModal
