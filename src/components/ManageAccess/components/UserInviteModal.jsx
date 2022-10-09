import {Button, Group, Modal, Stack, TextInput, Paper, Text, ActionIcon, Select, LoadingOverlay} from "@mantine/core";
import {selectInvitations, selectInvitationsLoading, selectUserInviteModalOpened} from "redux/reducer/ManageAccessSlice";
import useManageAccess from "../useManageAccess";
import {IconPlus, IconTrash} from "@tabler/icons";
import {useForm} from "@mantine/form";
import {useDispatch, useSelector} from "react-redux";
import {setInvitations, removeInvitations} from "redux/reducer/ManageAccessSlice";
import {showNotification} from "@mantine/notifications";
import {READABLE_ROLE_MAPPING} from "../../../roles";

const UserInviteModal = ({availableRoles, sendInvitation}) => {

  const opened = useSelector(selectUserInviteModalOpened)
  const invitationsLoading = useSelector(selectInvitationsLoading)
  const invitations = useSelector(selectInvitations);
  const {handleCloseUserInviteModal} = useManageAccess()

  const form = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    }
  })

  const dispatch = useDispatch();

  let roles = [];
  availableRoles.forEach((item) => {
    roles.push({value: item, label: READABLE_ROLE_MAPPING[item]})
  })

  const addEmailToList = (value) => {
    if (invitations.some(element => {
      if (element.email === value.email) return true
    })) {
      showNotification({
        title: 'Email already added',
        message: 'Please add new email address',
        color: "red"
      })
    } else {
      dispatch(setInvitations({email: value.email, role: availableRoles[0]}))
      form.reset();
    }
  }

  const deleteInvitation = (invite) => {
    dispatch(removeInvitations(invite));
  }

  const changeRole = () => {

  }


  return <Modal opened={opened}
                centered
                size="md"
                onClose={handleCloseUserInviteModal}
                title="Invite Collaborators"
  >
    <LoadingOverlay visible={invitationsLoading} overlayBlur={2}/>
    <form onSubmit={form.onSubmit(addEmailToList)}>
      <TextInput label="Email" withAsterisk placeholder="Email to invite" rightSectionWidth={80}
                 {...form.getInputProps('email')}
                 rightSection={<Button type="submit" compact variant="subtle" size="xs" leftIcon={<IconPlus size={14}/>}>Add</Button>}
      />
    </form>

    {invitations && (
      <Stack spacing="sm" mt="lg">
        {invitations.map((invite, index) => (
          <Paper key={index} withBorder p={"xs"}>
            <Group position="apart">
              <Text size="xs">{invite.email}</Text>
              <Group>
                <Select size="xs" defaultValue={invite.role} placeholder="Select" onChange={(e) => changeRole(e, invite.email)} data={roles} variant="subtle"/>
                <ActionIcon variant="subtle" onClick={() => deleteInvitation(invite)}><IconTrash size={14}/></ActionIcon>
              </Group>
            </Group>
          </Paper>
        ))}
      </Stack>
    )
    }

    <Group position="apart" mt="lg">
      <Button onClick={handleCloseUserInviteModal} variant='subtle'>Cancel</Button>
      <Button disabled={invitations.length === 0} onClick={sendInvitation}>Send Invitation</Button>
    </Group>
  </Modal>
}

export default UserInviteModal