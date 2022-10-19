import { Group, Paper, Text, TypographyStylesProvider, useMantineTheme, Box, Tooltip, Stack } from '@mantine/core'
import { TimeAgo } from 'components'
import { useGetOneDocRequestQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { IconCheck, IconChecks } from '@tabler/icons'

const SentMessage = ({ message }) => {
  const theme = useMantineTheme()
  const { data: docReq, isSuccess, isLoading } = useGetOneDocRequestQuery(message.from_document_request, { skip: message.from_document_request === null })
  return message && <Group position="right" align="end">
    <Paper radius="md" shadow="xs" sx={{
      maxWidth: '50%',
      background: theme.colorScheme === 'light' ? theme.colors['secondary'][2] : theme.colors['secondary'][3],
      borderBottomRightRadius: 2
    }} px="md" pt="md" pb="xs">
      <Stack>
        {
          isSuccess && <Tooltip label="View Document Request">
            <Paper p="xs">
              <Group>
                <Box sx={{ width: 10, height: '100%', minHeight: 10, borderRadius: 5, display: 'flex', background: theme.colors[docReq.status][5] }}></Box>
                <Text>{docReq.name}</Text>
              </Group>
            </Paper>
          </Tooltip>
        }
        <TypographyStylesProvider>
          <Text color="white">
            <div
              dangerouslySetInnerHTML={{
                __html: message.message_text
              }}
            />
          </Text>
        </TypographyStylesProvider>
      </Stack>
      <Group position="right">
        <Text size={10} color="white"><TimeAgo timestamp={message.timestamp} /></Text>
        {
          message && message.has_been_read ? <IconChecks size={12} color="white" /> : <IconCheck size={12} color="white" />
        }
      </Group>
    </Paper>
  </Group>
}

export default SentMessage
