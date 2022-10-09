import {Paper, Timeline, Text, Group, Stack,} from "@mantine/core";
import {useParams} from "react-router-dom";
import {IconCurrencyDollarCanadian} from "@tabler/icons";
import CurrencyFormat from 'react-currency-format'

import {useGetOneLoanApplicationQuery} from "redux/reducer/loanApplication/loanApplicationApiSlice";
import {TimeAgo} from "components";

const LoanDetailsTab = ()=>{


  const {id} = useParams();
  const {data: loanApplication, isSuccess} = useGetOneLoanApplicationQuery(id);


  return isSuccess && <Paper p="lg" withBorder>
    <Timeline active={0} lineWidth={2}>
      <Timeline.Item title="Loan Application Created">
        <Group position="apart">
          <Stack spacing="xs">
            <Text color="dimmed" size="md">{loanApplication.loan_description}</Text>
            <Text color="dimmed" size="sm"><IconCurrencyDollarCanadian size={14}/>
              <CurrencyFormat value={loanApplication.requested_amount} displayType={'text'} thousandSeparator={true}/>
              </Text>
          </Stack>
          <Text size="xs" mt={4}><TimeAgo timestamp={loanApplication.created_time}/></Text>
        </Group>
      </Timeline.Item>
      <Timeline.Item title="Loan Application Created">
        <Group position="apart">
          <Text color="dimmed" size="sm"></Text>
          <Text size="xs" mt={4}>2 hours ago</Text>
        </Group>
      </Timeline.Item>
    </Timeline>
  </Paper>

}

export default  LoanDetailsTab;