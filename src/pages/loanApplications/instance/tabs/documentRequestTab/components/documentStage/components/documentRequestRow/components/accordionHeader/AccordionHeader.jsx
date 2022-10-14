import { Accordion, ActionIcon, Box, Checkbox, Center, ColorSwatch, Divider, Group, Menu, Paper, Tooltip, useMantineTheme } from '@mantine/core'
import { CapitalizeFirstLetter, RenderIf, RenderIfElse } from 'utilities'
import { IconDotsVertical, IconGripVertical, IconMessage, IconTrash, IconUpload } from '@tabler/icons'
import { EditableTextInput } from 'components'
import People from '../People'
import UploadDocsCounter from '../UploadDocsCounter'
import RequiredFilesCount from '../RequiredFilesCount'
import useAccordionHeader from './useAccordionHeader'
import { useLogger } from '@mantine/hooks'

const AccordionHeader = ({ docReq, provided }) => {
  const theme = useMantineTheme()

  const { status, hovered, ref, checked, onDocRequestCheckboxCheck, handleOpenDocReqDeleteConfirmModal, handleOpenFileUploadModal, handleChangeDocRequestStatus, handleUpdateDocReqName, canManageDocRequests } = useAccordionHeader(docReq)
  return <Box ref={ref} sx={{ marginLeft: hovered || checked ? -36 : 0 }}>
    <Group>
      {(hovered || checked) && <Checkbox onChange={onDocRequestCheckboxCheck} value={docReq.id} />}
      <Paper px="md" sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        borderLeft: '5px solid ' + theme.colors[docReq.status][5],
        borderBottomLeftRadius: 0
      }}>
        <RenderIfElse isTrue={canManageDocRequests()} isFalse={<ActionIcon variant="transparent" disabled size="lg">
          <ColorSwatch size={14} color={theme.colors[docReq.status][5]} radius="sm" />
        </ActionIcon>}>
          <Menu position="bottom-start" shadow="md" width={120}>
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
          <People userId={docReq.assigned_to_user} userName={docReq.request_for_user_name} />
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

}

export default AccordionHeader
