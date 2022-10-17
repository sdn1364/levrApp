import { Accordion, Paper, ActionIcon, Group, Text, Stack, useMantineTheme, Center, Title, TextInput, Tooltip } from '@mantine/core'
import { IconNotes, IconCheck } from '@tabler/icons'
import { RenderIfElse } from 'utilities'
import RequiredFiles from '../../../requiredFiles/RequiredFiles'
import useDocumentRequestRow from './useDocumentRequestRow'
import UploadedFiles from '../../../uploadedFiles/UploadedFiles'
import { CheckPermission, EditableTextInput } from 'components'
import useStyles from './useStyles'
import AccordionHeader from './components/accordionHeader/AccordionHeader'

const DocumentRequestRow = ({ docReq, innerRef, provided, snapshot }) => {
  const { classes, cx } = useStyles()
  const theme = useMantineTheme()

  const { noteForm, handleUpdateNote } = useDocumentRequestRow(docReq)

  return <Accordion.Item {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         ref={innerRef}
                         shadow="md" sx={{ overflow: 'hidden' }} className={cx({ [classes.itemDragging]: snapshot.isDragging })} value={`${docReq.id}`}>
    <AccordionHeader docReq={docReq} provided={provided} />
    <Accordion.Panel sx={(theme) => ({ borderLeft: '5px solid ' + theme.colors[docReq.status][5] })}>
      <Stack>
        <CheckPermission ifUserCan="view document request required files" denied={<Text align="center">You don not have permission to access these files</Text>} module="loan application">
          <RequiredFiles docReq={docReq} />
        </CheckPermission>

        <Paper p="sm" sx={{ backgroundColor: theme.colorScheme === 'light' ? theme.colors['gray'][0] : theme.colors['gray'][9] }}>
          <Stack>
            <Group position="left">
              <Center><IconNotes color={theme.colors['purple'][5]} stroke={1.5} size={25} /><Title ml="sm" order={5}>Note</Title></Center>
            </Group>
            <CheckPermission ifUserCan="update document request notes" module="loan application" denied={<Text>{docReq.note}</Text>}>
              <RenderIfElse isTrue={docReq.note.length === 0} isFalse={<EditableTextInput save={(value) => handleUpdateNote({ note: value })} defaultValue={docReq.note} />}>
                <Group>
                  <TextInput
                    {...noteForm.getInputProps('note')}
                    sx={{ flex: 1 }} />
                  <Tooltip label="Click to save your note">
                    <ActionIcon variant="subtle" color="green" onClick={noteForm.onSubmit(handleUpdateNote)}><IconCheck size={18} /></ActionIcon>
                  </Tooltip>
                </Group>
              </RenderIfElse>
            </CheckPermission>
          </Stack>
        </Paper>
        <CheckPermission ifUserCan="view uploaded files" module="loan application">
          <Paper p="sm" sx={{ backgroundColor: theme.colorScheme === 'light' ? theme.colors['gray'][0] : theme.colors['gray'][9] }}>
            <UploadedFiles docReqId={docReq.id} />
          </Paper>
        </CheckPermission>
      </Stack>
    </Accordion.Panel>
  </Accordion.Item>
}
export default DocumentRequestRow
