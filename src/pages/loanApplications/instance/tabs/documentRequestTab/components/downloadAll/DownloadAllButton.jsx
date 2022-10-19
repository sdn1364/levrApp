import React from 'react'
import { Button } from '@mantine/core'
import { IconDownload } from '@tabler/icons'

const DownloadAllButton = () => {

  return <Button variant="outline" compact leftIcon={<IconDownload size={18} />}>Download All</Button>
}
export default DownloadAllButton
