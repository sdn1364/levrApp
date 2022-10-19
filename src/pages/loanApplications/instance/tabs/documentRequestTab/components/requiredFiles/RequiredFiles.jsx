import { Button, Center, Group, Title, Stack, Text, ActionIcon, Paper, Divider, useMantineTheme } from '@mantine/core'
import { IconFileInfo, IconJpg, IconPlus, IconTrash } from '@tabler/icons'
import { useGetAllDocReqRequiredFilesQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { CheckPermission, DownloadButton } from 'components'
import { RenderIf } from 'utilities'
import useRequiredFiles from './useRequiredFiles'

const RequiredFiles = ({ docReq, parent }) => {

  const theme = useMantineTheme()
  const { data: allRequiredFiles, isSuccess } = useGetAllDocReqRequiredFilesQuery(docReq.id)

  const { handleOpenUploadRequiredFilesModal } = useRequiredFiles()
  return isSuccess && <Paper p="sm" sx={{ backgroundColor: theme.colorScheme === 'light' ? theme.colors['gray'][0] : theme.colors['gray'][9] }}>
    <Group position="apart">
      <Center inline>
        <IconFileInfo color={theme.colorScheme === 'light' ? theme.colors['purple'][5] : theme.colors['purple'][3]} stroke={1.5} size={25} /> <Title ml="sm" order={5}>Required Documents</Title>
      </Center>
      <CheckPermission ifUserCan="add required file" module="loan application">
        <Button variant="outline" compact size="sm" leftIcon={<IconPlus size={18} />} onClick={() => handleOpenUploadRequiredFilesModal(docReq.id)}>
          Add
        </Button>
      </CheckPermission>
    </Group>
    <RenderIf isTrue={allRequiredFiles.length > 0}>
      <Stack mt="xl">
        {allRequiredFiles.map(({ name, file_extension, file_url }, index) => (
          <Group key={index} position="apart">
            <Center inline>
              {file_extension === 'jpeg' && <IconJpg />}
              <Text ml="sm">{name}</Text>
            </Center>
            <Divider variant="dashed" sx={{ flex: 1 }} />
            <Group>
              <CheckPermission ifUserCan="download required file" module="loan application">
                <DownloadButton url={file_url}
                                fileName={`${name}.${file_extension}`} />
              </CheckPermission>
              <CheckPermission ifUserCan="delete required file">
                <ActionIcon><IconTrash size={18} color={theme.colors['red'][5]} /></ActionIcon>
              </CheckPermission>
            </Group>
          </Group>
        ))}
      </Stack>
    </RenderIf>

  </Paper>

}
export default RequiredFiles
