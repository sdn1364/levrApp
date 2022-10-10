import { Center, Title, useMantineTheme } from '@mantine/core'
import { IconAlertOctagon, IconAlertTriangle } from '@tabler/icons'

const useConfirmModal = () => {

  const theme = useMantineTheme()

  const renderTitle = (isDanger, title) => {
    if (isDanger) {


      return <Center inline><IconAlertOctagon size={30} stroke={1.5} color={theme.colors['red'][5]} /><Title ml={5} order={5} color="red.5">{title}</Title></Center>
    } else {
      return <Center inline><IconAlertTriangle size={30} stroke={1.5} color={theme.colors['yellow'][5]} /><Title ml={5} order={5} color="yellow.5">{title}</Title></Center>

    }
  }


  return { renderTitle }

}
export default useConfirmModal