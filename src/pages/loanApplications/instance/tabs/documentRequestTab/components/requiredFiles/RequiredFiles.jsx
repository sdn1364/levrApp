import { Button, Center, Group, Title, Stack, Text, ActionIcon, Paper, Divider, useMantineTheme } from '@mantine/core'
import { IconFileInfo, IconJpg, IconPlus, IconTrash } from '@tabler/icons'
import { useGetAllDocReqRequiredFilesQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { DownloadButton } from 'components'
import { RenderIf } from '../../../../../../../utilities'

const RequiredFiles = ({ docReq, parent }) => {
  const theme = useMantineTheme()
  const { data: allRequiredFiles, isSuccess } = useGetAllDocReqRequiredFilesQuery(docReq.id)
  return isSuccess && <Paper p="sm" sx={{ backgroundColor: theme.colorScheme === 'light' ? theme.colors['gray'][0] : theme.colors['gray'][9] }}>
    <Group position="apart">

      <Center inline>
        <IconFileInfo color={theme.colorScheme === 'light' ? theme.colors['purple'][5] : theme.colors['purple'][3]} stroke={1.5} size={25} /> <Title ml="sm" order={5}>Required Documents</Title>
      </Center>

      <Button variant="outline" compact size="sm" leftIcon={<IconPlus size={18} />}>
        Add
      </Button>
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
              <DownloadButton url={file_url}
                              fileName={`${name}.${file_extension}`} />
              <ActionIcon><IconTrash size={18} color={theme.colors['red'][5]} /></ActionIcon>
            </Group>
          </Group>
        ))}
      </Stack>
    </RenderIf>

  </Paper>

}
export default RequiredFiles
