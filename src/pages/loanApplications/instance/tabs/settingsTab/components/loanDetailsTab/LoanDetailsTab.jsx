import { Button, Group, Paper, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconCurrencyDollarCanadian } from '@tabler/icons'
import { CheckPermission, TimeAgo } from 'components'
import useLoanDetails from './useLoanDetails'
import LoanAppDeleteModal from './components/LoanAppDeleteModal'

const LoanDetailsTab = () => {
  const {
    isSuccess,
    loanApp,
    descriptionForm,
    amountForm,
    noteForm,
    handelUpdateDescription,
    handleUpdateAmount,
    handleUpdateNote,
    handleOpenLoanAppDeleteModal
  } = useLoanDetails()
  return isSuccess && <>
    <LoanAppDeleteModal />
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
          <form onSubmit={descriptionForm.onSubmit(handelUpdateDescription)}>
            <CheckPermission ifUserCan="update loan application description" module="loan application">
              {
                ({ permission }) => (<TextInput {...descriptionForm.getInputProps('description')} label="Loan Description" disabled={!permission} />)
              }
            </CheckPermission>
            <CheckPermission ifUserCan="update loan application description" module="loan application">
              <Group position="right">
                <Button type="submit" variant="subtle">Change Description</Button>
              </Group>
            </CheckPermission>
          </form>

          <form onSubmit={amountForm.onSubmit(handleUpdateAmount)}>
            <CheckPermission ifUserCan="update requested amount" module="loan application">
              {
                ({ permission }) => (<TextInput {...amountForm.getInputProps('amount')} icon={<IconCurrencyDollarCanadian size={14} />} label="Requested Loan Amount (CAD)" disabled={!permission} />
                )
              }
            </CheckPermission>
            <CheckPermission ifUserCan="update requested amount" module="loan application">
              <Group position="right">
                <Button type="submit" variant="subtle">Change Requested Amount</Button>
              </Group>
            </CheckPermission>
          </form>
          <form onSubmit={noteForm.onSubmit(handleUpdateNote)}>
            <CheckPermission ifUserCan="update requested amount" module="loan application">
              {
                ({ permission }) => (<TextInput {...noteForm.getInputProps('note')} label="Notes(Visible to Broker/Lender)" disabled={!permission} />)
              }
            </CheckPermission>
            <CheckPermission ifUserCan="save note" module="loan application">
              <Group position="right">
                <Button type="submit" variant="subtle">Save Note</Button>
              </Group>
            </CheckPermission>
          </form>
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
                <Button variant="outline" color="red.5" onClick={() => handleOpenLoanAppDeleteModal(loanApp.id)}>Delete Loan Application</Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </CheckPermission>


    </Stack>
  </>
}
export default LoanDetailsTab