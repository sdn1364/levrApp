import { Box, Group, Paper, Stack, Text, Tooltip, TypographyStylesProvider, useMantineTheme } from '@mantine/core'
import { TimeAgo } from 'components'
import { IconCheck, IconChecks } from '@tabler/icons'
import { useGetOneDocRequestQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'

const ReceivedMessage = ({ message }) => {
  const theme = useMantineTheme()
  const { data: docReq, isSuccess, isLoading } = useGetOneDocRequestQuery(message.from_document_request, { skip: message.from_document_request === null })

  return message && <Group position="left" align="end">
    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colorScheme === 'light' ? theme.colors['gray'][3] : theme.colors['gray'][7], borderBottomLeftRadius: 2 }} px="md" pt="md" pb="xs">
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
          <Text>
            <div
              dangerouslySetInnerHTML={{
                __html: message.message_text
              }}
            />
          </Text>
        </TypographyStylesProvider>
      </Stack>
      <Group>
        {
          message && message.has_been_read ? <IconChecks size={12} /> : <IconCheck size={12} />
        }
        <Text size={10}><TimeAgo timestamp={message.timestamp} /></Text>

      </Group>
    </Paper>

  </Group>
}

export default ReceivedMessage
