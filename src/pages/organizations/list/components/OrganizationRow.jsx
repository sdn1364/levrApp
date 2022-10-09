import { Link } from 'react-router-dom'
import { Tooltip, Avatar, Paper, Group, Title } from '@mantine/core'
import useOrganizationRow from './useOrganizationRow'

const OrganizationRow = ({ organization }) => {

  const { renderIcon } = useOrganizationRow()

  return <Tooltip label="Click for detail">
    <Paper
      component={Link}
      to={`/organizations/${organization.id}`}
      shadow="xs" p="md"
      radius="md"
    >
      <Group position="apart">
        <Group>
          <Avatar />
          <Title weight={500} order={5}>{organization.name}</Title>
        </Group>
        {renderIcon(organization.org_type)}
      </Group>
    </Paper>
  </Tooltip>
}
export default OrganizationRow