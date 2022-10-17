import { Button, Group, Paper, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconCurrencyDollarCanadian } from '@tabler/icons'
import { useParams } from 'react-router-dom'
import { useGetOneLoanApplicationQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { CheckPermission, TimeAgo } from 'components'
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
          <CheckPermission ifUserCan="update loan application description" module="loan application">
            {
              ({ permission }) => (<TextInput label="Loan Description" defaultValue={loanApp.loan_description} disabled={!permission} />)
            }
          </CheckPermission>
          <CheckPermission ifUserCan="update loan application description" module="loan application">
            <Group position="right">
              <Button type="submit" variant="subtle">Change Description</Button>
            </Group>
          </CheckPermission>
          <CheckPermission ifUserCan="update requested amount" module="loan application">
            {
              ({ permission }) => (<TextInput icon={<IconCurrencyDollarCanadian size={14} />} label="Requested Loan Amount (CAD)" defaultValue={loanApp.requested_amount} disabled={!permission} />
              )
            }
          </CheckPermission>
          <CheckPermission ifUserCan="update requested amount" module="loan application">
            <Group position="right">
              <Button type="submit" variant="subtle">Change Requested Amount</Button>
            </Group>
          </CheckPermission>
          <CheckPermission ifUserCan="update requested amount" module="loan application">
            {
              ({ permission }) => (<TextInput label="Notes(Visible to Broker/Lender)" defaultValue={loanApp.note} disabled={!permission} />)
            }
          </CheckPermission>
          <CheckPermission ifUserCan="save note" module="loan application">
            <Group position="right">
              <Button type="submit" variant="subtle">Save Note</Button>
            </Group>
          </CheckPermission>
        </Stack>
      </Paper>
      <CheckPermission ifUserCan="delete loan application" module="loan application">
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
      </CheckPermission>


    </Stack>
  </>
}
export default LoanDetailsTab