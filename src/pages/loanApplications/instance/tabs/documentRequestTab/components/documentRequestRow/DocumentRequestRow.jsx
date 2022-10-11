import { Accordion, Paper, ActionIcon, Menu, Group, Divider, Text, Box, Checkbox, ColorSwatch, Stack, useMantineTheme, Center, createStyles, Tooltip, Title, TextInput } from '@mantine/core'
import { IconUpload, IconMessage, IconGripVertical, IconTrash, IconDotsVertical, IconNotes, IconCheck } from '@tabler/icons'
import { RenderIfElse, CapitalizeFirstLetter, RenderIf } from 'utilities'
import RequiredFiles from '../requiredFiles/RequiredFiles'
import UploadDocsCounter from './components/UploadDocsCounter'
import RequiredFilesCount from './components/RequiredFilesCount'
import People from './components/People'
import useDocumentRequestRow from './useDocumentRequestRow'
import UploadedFiles from '../uploadedFiles/UploadedFiles'
import { ActionGroup, EditableTextInput } from 'components'

const useStyles = createStyles((theme) => ({
  itemDragging: {
    boxShadow: theme.shadows.lg
  }
}))

const DocumentRequestRow = ({ docReq, innerRef, provided, snapshot }) => {
  const { classes, cx } = useStyles()
  const theme = useMantineTheme()

  const { status, opened, setOpened, hovered, ref, checked, onDocRequestCheckboxCheck, handleOpenDocReqDeleteConfirmModal, canManageDocRequests, canManageDocRequestFiles, handleOpenFileUploadModal, handleChangeDocRequestStatus, handleUpdateDocReqName } = useDocumentRequestRow(docReq)
  return (
    <Accordion.Item {...provided.draggableProps} {...provided.dragHandleProps} ref={innerRef} className={cx({ [classes.itemDragging]: snapshot.isDragging })} value={`${docReq.id}`}>
      <Box ref={ref} sx={{ marginLeft: hovered || checked ? -36 : 0 }}>
        <Group>
          {(hovered || checked) && <Checkbox onChange={onDocRequestCheckboxCheck} value={docReq.id} />}
          <Paper px="md" sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            borderLeft: '5px solid ' + theme.colors[docReq.status][5]
          }}>
            <RenderIfElse isTrue={canManageDocRequests()} isFalse={<ActionIcon variant="transparent" disabled size="lg">
              <ColorSwatch size={14} color={theme.colors[docReq.status][5]} radius="sm" />
            </ActionIcon>}>
              <Menu position="bottom-start" shadow="md" width={120} opened={opened} onChange={setOpened}>
                <Menu.Target>
                  <ActionIcon size="lg">
                    <ColorSwatch size={14} color={theme.colors[docReq.status][5]} radius="xs" />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Status Color</Menu.Label>
                  {status.map((st, index) => (
                    <Menu.Item key={index} onClick={() => handleChangeDocRequestStatus(st.name, docReq.id)}>
                      <Group>
                        <ColorSwatch size={14} color={st.color} radius="xs" /> {CapitalizeFirstLetter(st.name)}
                      </Group>
                    </Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            </RenderIfElse>
            <div {...provided.dragHandleProps}>
              <Center>
                <IconGripVertical size={18} stroke={1.5} />
              </Center>
            </div>
            <Accordion.Control>
              <RenderIfElse isTrue={canManageDocRequests()} isFalse={docReq.name}>
                <EditableTextInput singleClick defaultValue={docReq.name} save={handleUpdateDocReqName} />
              </RenderIfElse>
            </Accordion.Control>

            <Group mr="xs" spacing="md" noWrap>
              <People userId={docReq.assigned_to_user}
                      userName={docReq.request_for_user_name} />
              <UploadDocsCounter count={docReq.upload_count} />
              <RequiredFilesCount docReqId={docReq.id} />
              <Divider orientation="vertical" />
            </Group>
            <RenderIf isTrue={canManageDocRequests()}>
              <Tooltip label="Upload to this document request">
                <ActionIcon color="purple" size="lg" onClick={() => handleOpenFileUploadModal(docReq.id)}>
                  <IconUpload size={16} />
                </ActionIcon>
              </Tooltip>
            </RenderIf>
            <Tooltip label="Click to discuss this document request">
              <ActionIcon color="purple" size="lg">
                <IconMessage size={16} />
              </ActionIcon>
            </Tooltip>
            <RenderIf isTrue={canManageDocRequests()}>
              <Menu shadow="md">
                <Menu.Target>
                  <ActionIcon size="lg">
                    <IconDotsVertical size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item color="red" icon={<IconTrash size={16} />} onClick={() => handleOpenDocReqDeleteConfirmModal(docReq)}>
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </RenderIf>
          </Paper>
        </Group>
      </Box>
      <Accordion.Panel sx={(theme) => ({ borderLeft: '5px solid ' + theme.colors[docReq.status][5] })}>
        <Stack>
          <RenderIfElse isTrue={canManageDocRequestFiles()} isFalse={<Text align="center">You don not have permission to access these files</Text>}>
            <RequiredFiles docReq={docReq} />
          </RenderIfElse>
          <Paper p="sm" sx={{ backgroundColor: theme.colorScheme === 'light' ? theme.colors['gray'][0] : theme.colors['gray'][9] }}>
            <Stack>
              <Group position="left">
                <Center><IconNotes color={theme.colors['purple'][5]} stroke={1.5} size={25} /><Title ml="sm" order={5}>Note</Title></Center>
              </Group>
              <RenderIfElse isTrue={canManageDocRequests()} isFalse={<Text>{docReq.note}</Text>}>
                <RenderIfElse isTrue={docReq.note.length === 0} isFalse={<EditableTextInput defaultValue={docReq.notes} />}>
                  <Group>
                    <TextInput
                      sx={{ flex: 1 }} />
                    <ActionIcon variant="subtle" color="green"><IconCheck size={18} /></ActionIcon>
                  </Group>
                </RenderIfElse>
              </RenderIfElse>
            </Stack>
          </Paper>
          <Paper p="sm" sx={{ backgroundColor: theme.colorScheme === 'light' ? theme.colors['gray'][0] : theme.colors['gray'][9] }}>
            <UploadedFiles docReqId={docReq.id} />
          </Paper>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  )
}
export default DocumentRequestRow
