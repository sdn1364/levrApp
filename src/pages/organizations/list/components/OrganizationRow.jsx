import {RenderIf} from "utilities";
import {Link} from 'react-router-dom';
import {Tooltip, Avatar, Paper, Group, Title} from '@mantine/core'
import {IconBuilding, IconBuildingBank, IconBuildingWarehouse} from "@tabler/icons";

const OrganizationRow = ({organization}) => {
  return <Tooltip label="Click for detail">
    <Paper
      component={Link}
      to={`/organizations/${organization.id}`}
      shadow="xs" p="md"
    >
      <Group position="apart">
        <Group>
          <Avatar />
          <Title order={5}>{organization.name}</Title>
        </Group>

        <RenderIf isTrue={organization.org_type === 'ORG_LENDER'}>
          <IconBuildingBank/>
        </RenderIf>
        <RenderIf isTrue={organization.org_type === 'ORG_BORROWER'}>
          <IconBuildingWarehouse/>
        </RenderIf>
        <RenderIf isTrue={organization.org_type === 'ORG_BROKER'}>
          <IconBuilding/>
        </RenderIf>
      </Group>
    </Paper>
  </Tooltip>
}
export default OrganizationRow