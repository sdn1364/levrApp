import { Accordion, ActionIcon, Box, Checkbox, Center, ColorSwatch, Divider, Group, Menu, Paper, Tooltip, useMantineTheme } from '@mantine/core'
import { CapitalizeFirstLetter, RenderIf, RenderIfElse } from 'utilities'
import { IconDotsVertical, IconGripVertical, IconMessage, IconTrash, IconUpload } from '@tabler/icons'
import { CheckPermission, EditableTextInput } from 'components'
import People from '../People'
import UploadDocsCounter from '../UploadDocsCounter'
import RequiredFilesCount from '../RequiredFilesCount'
import useAccordionHeader from './useAccordionHeader'

const AccordionHeader = ({ docReq, provided }) => {
  const theme = useMantineTheme()

  const {
    status, hovered, ref, checked, onDocRequestCheckboxCheck,
    handleOpenDocReqDeleteConfirmModal,
    handleOpenFileUploadModal,
    handleChangeDocRequestStatus,
    handleUpdateDocReqName,
    canManageDocRequests,
    handleOpenSendMessageModal
  } = useAccordionHeader(docReq)
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
        <CheckPermission ifUserCan="update document request status" module="loan application" denied={<ActionIcon variant="transparent" disabled size="lg">
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
        </CheckPermission>
        <CheckPermission ifUserCan="drag document request" module="load application">
          <div {...provided.dragHandleProps}>
            <Center>
              <IconGripVertical size={18} stroke={1.5} />
            </Center>
          </div>
        </CheckPermission>

        <Accordion.Control sx={{ paddingTop: canManageDocRequests() ? '16px' : '26px', paddingBottom: canManageDocRequests() ? '16px' : '26px' }}>

          <CheckPermission ifUserCan="update document request name" module="loan application" denied={docReq.name}>
            <EditableTextInput singleClick defaultValue={docReq.name} save={handleUpdateDocReqName} />
          </CheckPermission>

        </Accordion.Control>

        <Group mr="xs" spacing="md" noWrap>
          <People userId={docReq.assigned_to_user} userName={docReq.request_for_user_name} />
          <UploadDocsCounter count={docReq.upload_count} />
          <RequiredFilesCount docReqId={docReq.id} />
          <Divider orientation="vertical" />
        </Group>
        <CheckPermission ifUserCan="upload files to document request" module="loan application">
          <Tooltip label="Upload to this document request">
            <ActionIcon color="purple" size="lg" onClick={() => handleOpenFileUploadModal(docReq.id)}>
              <IconUpload size={16} />
            </ActionIcon>
          </Tooltip>
        </CheckPermission>

        <CheckPermission ifUserCan="send document request as message" module="loan application">

          <Tooltip label="Click to discuss this document request">
            <ActionIcon color="purple" size="lg" onClick={() => handleOpenSendMessageModal(docReq.id)}>
              <IconMessage size={16} />
            </ActionIcon>
          </Tooltip>
        </CheckPermission>
        <CheckPermission ifUserCan="delete document request" module="loan application">
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
        </CheckPermission>

      </Paper>
    </Group>
  </Box>

}

export default AccordionHeader
