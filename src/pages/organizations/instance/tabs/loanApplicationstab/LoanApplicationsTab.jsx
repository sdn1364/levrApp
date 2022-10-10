import { Stack } from '@mantine/core'
import LoanApplicationRow from '../../../../loanApplications/list/components/LoanApplicationRow'
import useLoanApplicationsTab from './useLoanApplicationsTab'

const LoanApplicationsTab = () => {

  const { organization, isSuccess } = useLoanApplicationsTab()

  return isSuccess && <Stack>
    <Stack spacing="sm">
      {organization && organization?.loan_applications.map((la) => {
        return <LoanApplicationRow redacted key={la.id} la={la} />
      })}
    </Stack>
  </Stack>


}
export default LoanApplicationsTab