import { ActionIcon, useMantineTheme } from '@mantine/core'
import { IconDownload } from '@tabler/icons'
import useDownloadButton from './useDownloadButton'


const DownloadButton = ({ url, fileName }) => {
  const theme = useMantineTheme()
  const { handleClick, loading } = useDownloadButton(url, fileName)
  return <ActionIcon onClick={handleClick} loading={loading}><IconDownload size={18} color={theme.colors['purple'][5]} /></ActionIcon>

}

export default DownloadButton
