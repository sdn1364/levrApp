import { Button, Group, Paper, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconCurrencyDollarCanadian } from '@tabler/icons'
import { useParams } from 'react-router-dom'
import { useGetOneLoanApplicationQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { TimeAgo } from 'components'
import { RenderIf } from 'utilities'
import { usePermission } from 'hooks'
import { useDispatch } from 'react-redux'

const LoanDetailsTab = () => {
  const { id } = useParams()
  const { data: loanApp, isSuccess } = useGetOneLoanApplicationQuery(id)
  const { canDeleteLoanApplication } = usePermission({})

  return isSuccess && <>
    <Stack spacing="xs">
      <Group position="apart">
        <Stack>
          <Title order={5}>Loan Application Details</Title>
          <Text size="xs" variant="dimmed">Update information associated with the loan application here</Text>
        </Stack>
        <Text size="sm">Date Created: <TimeAgo timestamp={loanApp.created_time} /></Text>
      </Group>
      <Paper p="md" withBorder>
        <Stack>
          <TextInput label="Loan Description" defaultValue={loanApp.loan_description} />
          <Group position="right">
            <Button type="submit" variant="subtle">Change Description</Button>
          </Group>
          <TextInput icon={<IconCurrencyDollarCanadian size={14} />} label="Requested Loan Amount (CAD)" defaultValue={loanApp.requested_amount} />
          <Group position="right">
            <Button type="submit" variant="subtle">Change Requested Amount</Button>
          </Group>
          <TextInput label="Notes(Visible to Broker/Lender)" defaultValue={loanApp.note} />
          <Group position="right">
            <Button type="submit" variant="subtle">Save Note</Button>
          </Group>
        </Stack>
      </Paper>
      <RenderIf isTrue={canDeleteLoanApplication()}>
        <Title order={5} color="red.5">Danger zone</Title>
        <Paper p="md" withBorder>
          <form>
            <Stack spacing="md">
              <Text>
                This will delete all Document Requests and attached Documents.
              </Text>
              <Text color="red" weight={500}>
                This action is irreversible.
              </Text>
              <Group position="left">
                <Button type="submit" variant="outline" color="red.5">Delete Loan Application</Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </RenderIf>

    </Stack>
  </>
}
export default LoanDetailsTab