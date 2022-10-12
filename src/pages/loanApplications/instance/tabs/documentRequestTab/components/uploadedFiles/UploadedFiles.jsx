import { Table, Text, Center, ActionIcon, Group, Button, Stack } from '@mantine/core'
import { IconDownload, IconUpload, IconJpg, IconTrash } from '@tabler/icons'
import People from '../documentStage/components/documentRequestRow/components/People'
import { DownloadButton, TimeAgo } from 'components'
import { useGetDocReqFilesQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { HumanFileSize } from 'utilities'
import useDocumentRequestRow from '../documentStage/components/documentRequestRow/useDocumentRequestRow'

const UploadedFiles = ({ docReqId }) => {


  const { data: docReqFiles, isSuccess } = useGetDocReqFilesQuery(docReqId)
  const { handleOpenFileUploadModal } = useDocumentRequestRow()

  return (isSuccess && docReqFiles.length > 0) ? <Table>
    <thead>
    <tr>
      <th style={{ flex: 1 }}>File name</th>
      <th style={{ textAlign: 'center', width: 100 }}>File size</th>
      <th style={{ textAlign: 'center', width: 100 }}>Uploaded by</th>
      <th style={{ textAlign: 'center', width: 180 }}>Upload time</th>
      <th style={{ textAlign: 'center', width: 100 }}></th>
    </tr>
    </thead>

    <tbody>
    {
      docReqFiles.map(({ created_by, created_by_email, file_size, upload_time, name, file_extension, file_url }, index) => (
        <tr key={index}>
          <td><Center inline>{(file_extension === 'jpg' || file_extension === 'jpeg') && <IconJpg size={18} />}<Text ml="xs">{name}</Text></Center></td>
          <td><Center>{HumanFileSize(file_size)}</Center></td>
          <td><Center>
            <People userName={created_by_email} userId={created_by} />
          </Center>
          </td>
          <td><Center><TimeAgo timestamp={upload_time} /></Center></td>
          <td>
            <Group>
              <DownloadButton url={file_url}
                              fileName={`${name}.${file_extension}`} />
              <ActionIcon color="red"><IconTrash size={18} /></ActionIcon>
            </Group>
          </td>
        </tr>
      ))
    }
    </tbody>
  </Table> : <Stack>

    <Text align="center">It feels lonely here upload your first document</Text>
    <Center>
      <Button onClick={() => handleOpenFileUploadModal(docReqId)} leftIcon={<IconUpload size={18} />}>Upload Document</Button>
    </Center>
  </Stack>
}
export default UploadedFiles
