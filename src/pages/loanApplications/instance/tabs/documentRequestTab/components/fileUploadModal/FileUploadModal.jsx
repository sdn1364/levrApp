import { Button, Group, Modal, Stack, TextInput, Text, useMantineTheme, Paper, Center, ActionIcon } from '@mantine/core'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone'
import { IconFileDescription, IconFileImport, IconFileSpreadsheet, IconFileText, IconJpg, IconPng, IconUpload, IconX } from '@tabler/icons'
import useFileUploadModal from './useFileUploadModal'
import { useState } from 'react'

const FileUploadModal = () => {

  const theme = useMantineTheme()
  const {
    docReqId,
    files,
    form,
    handleCloseFileUploadModal,
    handleUploadFiles,
    handleAddFiles,
    handleRemoveFiles
  } = useFileUploadModal()
  const previews = files.map((file, index) => {
    return (
      <Paper px={4} py={3} withBorder key={index}>
        <Group position="apart">
          <Group>
            <Center>
              {(file.type === MIME_TYPES.png) && <IconPng stroke={1.5} />}
              {(file.type === MIME_TYPES.jpeg) && <IconJpg stroke={1.5} />}
              {(file.type === MIME_TYPES.doc || file.type === MIME_TYPES.docx) && <IconFileDescription color="blue" stroke={1.5} />}
              {(file.type === MIME_TYPES.xls || file.type === MIME_TYPES.xlsx) && <IconFileSpreadsheet color="green" stroke={1.5} />}
              {(file.type === MIME_TYPES.pdf) && <IconFileText color="red" stroke={1.5} />}
            </Center>
            <Text size="sm">
              {file.name}
            </Text>
          </Group>
          <ActionIcon onClick={handleRemoveFiles}><IconX /></ActionIcon>
        </Group>
      </Paper>
    )
  })
  return <Modal opened={docReqId !== null} centered
                onClose={handleCloseFileUploadModal}
                title="Upload File for Document Request"
  >
    <form onSubmit={form.onSubmit(handleUploadFiles)} encType="multipart/form-data">
      <Stack spacing="xl">

        <TextInput {...form.getInputProps('name')} label="Name" placeholder="Type the name of the document" />
        <Dropzone {...form.getInputProps('file')}
                  onDrop={(files) => handleAddFiles(files)}
                  onReject={(files) => console.log('rejected files', files)}
                  accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.pdf, MIME_TYPES.doc, MIME_TYPES.docx, MIME_TYPES.xls, MIME_TYPES.xlsx]}
        >
          <Group position="center" spacing="xl" style={{ minHeight: 180, pointerEvents: 'none' }}>
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
            <Dropzone.Idle>
              <Stack align="center" spacing="xs">

                <IconFileImport size={60} stroke={0.5} />

                <Text align="center" inline>
                  Click here to choose your files or Drag them here
                </Text>
              </Stack>
            </Dropzone.Idle>
          </Group>
        </Dropzone>
        <Stack spacing={3}>
          {previews}
        </Stack>
        <Group position="apart">
          <Button variant="subtle" onClick={handleCloseFileUploadModal}>Cancel</Button>
          <Button type="submit">Upload</Button>
        </Group>
      </Stack></form>

  </Modal>
}
export default FileUploadModal
