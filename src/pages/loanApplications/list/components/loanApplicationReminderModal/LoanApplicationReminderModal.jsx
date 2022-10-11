import { RichTextEditor } from '@mantine/rte'
import useLoanApplicationReminderModal from './useLoanApplicationReminderModal'
import { GenericModal } from 'components'
import { Stack, Text, Paper, LoadingOverlay } from '@mantine/core'
import User from './components/user/User'
import { useState } from 'react'

const LoanApplicationReminderModal = () => {
  const { opened, value, closeLoanApplicationReminderModal, sendReminder, loanAppUsersAndInvites, loanAppUsersAndInvitesIsSuccess, isLoading } = useLoanApplicationReminderModal()
  const [form, setForm] = useState({
    message: value,
    selectedUsers: [],
    selectedInvitations: []
  })


  const handleChecked = (event) => {
    const {
      target: { value, name, checked }
    } = event

    const id = parseInt(value, 10)

    setForm((form) => ({
      ...form,
      [name]: checked
        ? [...form[name], id]
        : form[name].filter((element) => element !== id)
    }))
    console.log(form)
  }

  return <GenericModal
    opened={opened !== null}
    title="Send Reminder Email"
    size="lg"
    centered
    submitText="Send"
    onClose={closeLoanApplicationReminderModal}
  >
    {
      loanAppUsersAndInvitesIsSuccess ? <Paper p="md" withBorder>

        <Stack>
          {
            loanAppUsersAndInvites.user_roles.length > 0 ? loanAppUsersAndInvites.user_roles.map((user, index) => {
              return <User onChange={handleChecked} name="selectedUsers"
                           userId={user.user_id} key={`owner-${index}`} title={user.user_email} />
            }) : <Text size="lg" align="center" weight={500}>No use has accepted the invitation yet</Text>
          }
          {
            loanAppUsersAndInvites.invitations.length > 0 ? loanAppUsersAndInvites.invitations.map((user, index) => {
              return <User onChange={handleChecked} name="selectedInvitations"
                           userId={user.user_id} key={`invite-${index}`} title={user.to_email} description="Invitation not yet accepted" />
            }) : null
          }
        </Stack>
      </Paper> : <LoadingOverlay visible={isLoading} />
    }

    <RichTextEditor value={value}
                    sx={{ minHeight: 150 }}
                    id="rte"
                    controls={[
                      ['bold', 'italic', 'underline', 'link'],
                      ['unorderedList', 'h1', 'h2', 'h3'],
                      ['alignLeft', 'alignCenter', 'alignRight']
                    ]}
    />
  </GenericModal>
}
export default LoanApplicationReminderModal
