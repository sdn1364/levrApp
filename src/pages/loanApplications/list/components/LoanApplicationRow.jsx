import { Tooltip, Paper, Title, Text, Group, ActionIcon, Center } from '@mantine/core'
import { Link } from 'react-router-dom'
import { IconBell, IconCurrencyDollarCanadian } from '@tabler/icons'
import CurrencyFormat from 'react-currency-format'

import useLoanApplicationList from '../useLoanApplicationList'

const LoanApplicationRow = ({ la, redacted }) => {

  const { openLoanApplicationReminderModal } = useLoanApplicationList()

  return <Paper shadow="xs" pr="md">
    <Group position="apart">
      <Tooltip label="Click for detail">
        <Paper component={Link} to={`/loan-applications/${la.id}`} sx={{ flex: 1, height: '100%' }} p="md">
          <Group position="apart">
            <Title order={5} weight={500}>{la.loan_description}</Title>
            <Group spacing="xs" sx={{ width: 250 }}>
              <Text size="xs" color="dimmed" inline>Requested Amount:</Text>
              <Text inline>
                <Center inline>
                  <IconCurrencyDollarCanadian size={16} />
                  <CurrencyFormat value={la.requested_amount} displayType={'text'} thousandSeparator={true} />
                </Center>
              </Text>
            </Group>
          </Group>
        </Paper>
      </Tooltip>
      <Group position="right">
        {
          !redacted && <ActionIcon variant="subtle" color="primary" onClick={() => openLoanApplicationReminderModal(la.id)}><IconBell stroke={1} size={16} /></ActionIcon>
        }
      </Group>
    </Group>
  </Paper>

}
export default LoanApplicationRow
