import { Button, Group, Modal, Stack, TextInput, Text, useMantineTheme, SimpleGrid, Image } from '@mantine/core'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { IconFiles, IconUpload, IconX } from '@tabler/icons'
import { selectFileUploadModal } from 'redux/reducer/loanApplication/docRequestSlice'
import { useSelector } from 'react-redux'
import useFileUploadModal from './useFileUploadModal'
import { useState } from 'react'

const FileUploadModal = () => {

  const theme = useMantineTheme()
  const opened = useSelector(selectFileUploadModal)
  const { handleCloseFileUploadModal } = useFileUploadModal()
  const [files, setFiles] = useState([])

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file)
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    )
  })
  return <Modal opened={opened !== null} centered
                onClose={handleCloseFileUploadModal}
                title="Upload File for Document Request"
  >
    <Stack spacing="xl">
      <TextInput label="Name" placeholder="Type the name of the document" />
      <Dropzone onDrop={setFiles}
                onReject={(files) => console.log('rejected files', files)}
                accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.pdf, MIME_TYPES.doc, MIME_TYPES.docx, MIME_TYPES.xls, MIME_TYPES.xlsx]}
      >
        <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={theme.colors[theme.primaryColor][theme.colorScheme === 'light' ? 4 : 6]}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={50}
              stroke={1.5}
              color={theme.colors['red'][theme.colorScheme === 'light' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Stack align="center" spacing="xs">
            <Dropzone.Idle>
              <IconFiles size={50} stroke={1} />
            </Dropzone.Idle>
            <Text align="center" inline>
              Drag Your Files here
            </Text>
            {/*            <Text size="sm" align="center" color="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>*/}
          </Stack>
        </Group>
      </Dropzone>
      <SimpleGrid
        cols={4}
        mt={previews.length > 0 ? 'xl' : 0}
      >
        {previews}
      </SimpleGrid>
      <Group position="apart">
        <Button variant="subtle" onClick={handleCloseFileUploadModal}>Cancel</Button>
        <Button>Upload</Button>
      </Group>
    </Stack>

  </Modal>
}
export default FileUploadModal
