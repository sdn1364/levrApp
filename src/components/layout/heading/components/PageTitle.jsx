import {ActionIcon, Divider, Group, Title} from "@mantine/core";
import {IconArrowLeft} from "@tabler/icons";
import {RenderIf} from "utilities";
import {Link} from "react-router-dom";

const PageTitle = ({hasBack, to, children})=>{
  return <Group spacing="xs">
    <RenderIf isTrue={hasBack}>
      <ActionIcon variant="transparent" color='purple' component={Link} to={to}><IconArrowLeft/></ActionIcon>
      <Divider orientation="vertical" />
    </RenderIf>
    <Title order={3} inline>{children}</Title></Group>
}
export default PageTitle;