import { ConfirmModal } from 'components'
import { useSelector } from 'react-redux'
import useLoanAppDeleteModal from './useLoanAppDeleteModal'
import { Text } from '@mantine/core'
import { selectLoanAppDeleteModal } from 'redux/reducer/loanApplication/loanApplicationSlice'

const LoanAppDeleteModal = () => {
  const opened = useSelector(selectLoanAppDeleteModal)
  console.log(opened)

  const { handleDeleteLoanApp, handleCloseLoanAppDeleteModal } = useLoanAppDeleteModal()
  return <ConfirmModal title="You Are About to Delete A Loan Application"
                       isDanger
                       opened={opened !== null}
                       onClose={handleCloseLoanAppDeleteModal}
                       submitLabel="delete"
                       onSubmit={handleDeleteLoanApp}>
    <Text>
      Are you sure you want to delete this Loan Application?
    </Text>

  </ConfirmModal>
}

export default LoanAppDeleteModal
