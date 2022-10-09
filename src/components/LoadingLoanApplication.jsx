import { Center, Progress, Stack, Title, useMantineTheme } from '@mantine/core'
import { selectLoanApplicationLoading } from '../redux/reducer/loanApplication/loanApplicationSlice'
import { useSelector } from 'react-redux'
import { useLogger } from '@mantine/hooks'

const LoadingLoanApplication = () => {
  const theme = useMantineTheme()
  const { percent, step } = useSelector(selectLoanApplicationLoading)

  useLogger('loading status', [percent])

  return <Center sx={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, background: theme.colors['gray'][0], zIndex: 10 }}>
    <Stack sx={{ width: '300px' }} mb={100}>
      <Title align="center" order={3}>{step}</Title>
      <Progress radius="xl" size="md" value={20} animate />
    </Stack>
  </Center>
}
export default LoadingLoanApplication