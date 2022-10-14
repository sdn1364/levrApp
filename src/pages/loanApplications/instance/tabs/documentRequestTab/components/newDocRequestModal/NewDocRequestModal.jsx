import { Button, Group, Modal, MultiSelect, Stack, Title, TransferList, Text, Paper } from '@mantine/core'
import useNewDocReqModal from './useNewDocReqModal'
import { RenderIf } from 'utilities'
import User from '../../../../../list/components/loanApplicationReminderModal/components/user/User'

const NewDocRequestModal = ({
                              existingBorrowers,
                              invitedBorrowers
                            }) => {

  const {
    selected,
    handleChangePack,
    handleSetSelected,
    guidePackData,
    opened,
    handleCloseNewDocRequestModal,
    shouldShowPersonSelect
  } = useNewDocReqModal()

  return <Modal opened={opened} value={'select'}
                onClose={handleCloseNewDocRequestModal} size="xl" centered
                title="Add Document Request(s) to Loan Application"
  >
    <Stack spacing="xl">

      <MultiSelect shadow="xl" searchable clearable data={guidePackData()}
                   placeholder="Select all packs you need" defaultValue={''}
                   onChange={(value) => handleChangePack(value)}
      />
      <TransferList
        listHeight={200}
        value={selected}
        onChange={(value) => handleSetSelected(value)}
        searchPlaceholder="Search..."
        nothingFound="No guides selected"
        titles={['All Guides', 'Selected Guides']}
        breakpoint="sm"
      />
      <RenderIf isTrue={shouldShowPersonSelect()}>

        <Stack>
          <Stack spacing={1}>
            <Title order={5}>Personal documents selected</Title>
            <Text size="sm" color="dimmed">Please select the Borrower from whom you are requesting personal documents:</Text>
          </Stack>
          <Paper p="md" withBorder>

            <Stack>
              {
                existingBorrowers ? existingBorrowers.map((user, index) => {
                  return <User name="selectedUsers" onChange={() => console.log('checked')}
                               userId={user.user_id} key={`owner-${index}`} title={user.user_email} />
                }) : <Text size="lg" align="center" weight={500}>No use has accepted the invitation yet</Text>
              }
              {
                invitedBorrowers ? invitedBorrowers.map((user, index) => {
                  return <User name="selectedInvitations" onChange={() => console.log('checked')}
                               userId={user.user_id} key={`invite-${index}`} title={user.to_email} description="Invitation not yet accepted" />
                }) : null
              }
            </Stack>
          </Paper>
        </Stack>
      </RenderIf>

      <Group position="apart">
        <Button onClick={handleCloseNewDocRequestModal} variant="subtle">Cancel</Button>
        <Button>Add</Button>
      </Group>
    </Stack>
  </Modal>
}
export default NewDocRequestModal
