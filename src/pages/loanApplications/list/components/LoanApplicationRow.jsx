import {Tooltip, Paper, Title, Text, Group, ActionIcon} from "@mantine/core";
import {Link} from "react-router-dom";
import {IconBell} from "@tabler/icons";

const LoanApplicationRow = ({la, redacted})=>{
  return <Tooltip label="Click for detail">
    <Paper
      component={Link}
      to={`/loan-applications/${la.id}`}
      shadow="xs" p="md"
    >
      <Group position="apart">
        <Title order={5}>{la.loan_description}</Title>
        <Group>
          <Text size="sm" color="dimmed"><span>Requested Amount: </span><span>${la.requested_amount}</span></Text>
          {
            redacted ? null: <ActionIcon variant="subtle"><IconBell size={16} /></ActionIcon>
          }
        </Group>
      </Group>
    </Paper>
  </Tooltip>
}
export default LoanApplicationRow
