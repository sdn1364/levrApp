import { Accordion, Paper, ActionIcon, Group, Text, Stack, useMantineTheme, Center, Title, TextInput, Tooltip } from '@mantine/core'
import { IconNotes, IconCheck } from '@tabler/icons'
import { RenderIfElse } from 'utilities'
import RequiredFiles from '../../../requiredFiles/RequiredFiles'
import useDocumentRequestRow from './useDocumentRequestRow'
import UploadedFiles from '../../../uploadedFiles/UploadedFiles'
import { EditableTextInput } from 'components'
import useStyles from './useStyles'
import AccordionHeader from './components/accordionHeader/AccordionHeader'


const DocumentRequestRow = ({ docReq, innerRef, provided, snapshot }) => {
  const { classes, cx } = useStyles()
  const theme = useMantineTheme()

  const { canManageDocRequests, canManageDocRequestFiles } = useDocumentRequestRow(docReq)

  return docReq ? <Accordion.Item {...provided.draggableProps} {...provided.dragHandleProps} sx={{ overflow: 'hidden' }} ref={innerRef} className={cx({ [classes.itemDragging]: snapshot.isDragging })} value={`${docReq.id}`}>
    <AccordionHeader docReq={docReq} provided={provided} />
    <Accordion.Panel sx={(theme) => ({ borderLeft: '5px solid ' + theme.colors[docReq.status][5] })}>
      <Stack>
        <RenderIfElse isTrue={canManageDocRequests()} isFalse={<Text align="center">You don not have permission to access these files</Text>}>
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
                  <Tooltip label="Click to save your note">

                    <ActionIcon variant="subtle" color="green"><IconCheck size={18} /></ActionIcon>
                  </Tooltip>
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
  </Accordion.Item> : null
}
export default DocumentRequestRow
