import { RichTextEditor } from '@mantine/rte'
import useLoanApplicationReminderModal from './useLoanApplicationReminderModal'
import { GenericModal } from 'components'
import { Stack, Text, Paper, LoadingOverlay } from '@mantine/core'
import User from './components/user/User'

const LoanApplicationReminderModal = () => {
  const { opened, form, msg, setMsg, handleChecked, closeLoanApplicationReminderModal, sendReminder, loanAppUsersAndInvites, loanAppUsersAndInvitesIsSuccess, isLoading } = useLoanApplicationReminderModal()


  return <GenericModal
    opened={opened !== null}
    title="Send Reminder Email"
    size="lg"
    centered
    submitText="Send"
    submit={() => sendReminder(form)}
    onClose={closeLoanApplicationReminderModal}
  >
    {
      loanAppUsersAndInvitesIsSuccess ? <Paper p="md" withBorder>

        <Stack>
          {
            loanAppUsersAndInvites.user_roles.length > 0 ? loanAppUsersAndInvites.user_roles.map((user, index) => {
              return <User handleOnChange={handleChecked} name="selectedUsers"
                           userId={user.user_id} key={`owner-${index}`} title={user.user_email} />
            }) : <Text size="lg" align="center" weight={500}>No User has accepted the invitation yet</Text>
          }
          {
            loanAppUsersAndInvites.invitations.length > 0 ? loanAppUsersAndInvites.invitations.map((user, index) => {
              return <User handleOnChange={handleChecked} name="selectedInvitations"
                           userId={user.id} key={`invite-${index}`} title={user.to_email} description="Invitation not yet accepted" />
            }) : null
          }
        </Stack>
      </Paper> : <LoadingOverlay visible={isLoading} />
    }

    <RichTextEditor value={msg}
                    sx={{ minHeight: 150 }}
                    id="rte"
                    onChange={setMsg}
                    controls={[
                      ['bold', 'italic', 'underline', 'link'],
                      ['unorderedList', 'h1', 'h2', 'h3'],
                      ['alignLeft', 'alignCenter', 'alignRight']
                    ]}
    />
  </GenericModal>
}
export default LoanApplicationReminderModal
