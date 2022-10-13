import { Box, Button, Center, Stack, Text, Title } from '@mantine/core'
import { IconLayoutDistributeHorizontal } from '@tabler/icons'
import useEmptyLoanApplicationList from './useEmptyLoanApplicationList'

const EmptyLoanApplicationList = () => {

  const { navigateToNewLoanApplication } = useEmptyLoanApplicationList()

  return <Box sx={{ flex: 1 }}>
    <Center sx={{ height: '60vh' }}>
      <Stack spacing="lg">
        <Center><IconLayoutDistributeHorizontal stroke={0.5} size={120} /></Center>
        <Title order={2} align="center">You don’t have any Loan Applications yet!</Title>
        <Stack spacing="xs" mb={30}>
          <Text align="center" color="dimmed">Get Started by adding a Loan Application</Text>
        </Stack>
        <Button onClick={navigateToNewLoanApplication}>Add New Loan Application</Button>
      </Stack>
    </Center></Box>
}

export default EmptyLoanApplicationList
