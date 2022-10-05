import {Group,Text,Badge,ActionIcon} from "@mantine/core";
import {UserAvatar} from 'components';
import RoleSelect from "./RoleSelect";
import {READABLE_ROLE_MAPPING} from "roles";
import {IconTrash} from "@tabler/icons";
import useManageAccess from "components/ManageAccess/useManageAccess";


const RoleAndInviteRow = ({user, availableRole}) => {

  const {handleClickDeleteUserRole} = useManageAccess();

  return <tr>
    <td>
      <Group spacing="sm">
        <UserAvatar size={40} userId={user.user_id} radius={40}/>
        <div>
          <Text size="sm" weight={500}>
            {user.user_full_name}
          </Text>
          <Text size="xs" color="dimmed">
            {user.user_email}
          </Text>
        </div>
      </Group>
    </td>

    <td>
      {
        availableRole.includes(user.roles[0])
        ? <RoleSelect value={user.roles} availableRole={availableRole}/>
          : <Text>{READABLE_ROLE_MAPPING[user.roles[0]]}</Text>

      }
    </td>
    <td><Badge fullWidth color="green">Accepted</Badge></td>
    <td>
      <ActionIcon variant="subtle" onClick={()=>handleClickDeleteUserRole(user.user_id)}><IconTrash size={16} /></ActionIcon>
    </td>
  </tr>
}
export default RoleAndInviteRow;
