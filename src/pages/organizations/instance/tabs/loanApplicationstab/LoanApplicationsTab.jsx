import { Stack } from '@mantine/core'
import LoanApplicationRow from '../../../../loanApplications/list/components/LoanApplicationRow'
import useLoanApplicationsTab from './useLoanApplicationsTab'
import EmptyLoanApplicationList from './emptyLoanApplicationList/EmptyLoanApplicationList'

const LoanApplicationsTab = () => {

  const { organization, isSuccess } = useLoanApplicationsTab()

  return (isSuccess && organization?.loan_applications.length > 0) ? <Stack>
    <Stack spacing="sm">
      {organization && organization?.loan_applications.map((la) => {
        return <LoanApplicationRow redacted key={la.id} la={la} />
      })}
    </Stack>
  </Stack> : <EmptyLoanApplicationList />


}
export default LoanApplicationsTab