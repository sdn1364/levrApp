import { Box, Grid, Paper, Group, ActionIcon, TextInput, Title, UnstyledButton, ScrollArea, Center, Text, Popover, Tooltip, Stack, useMantineTheme, Divider, LoadingOverlay } from '@mantine/core'
import { IconArrowBigLeftLine, IconMessages, IconMoodSmile, IconSend } from '@tabler/icons'
import EmojiPicker from 'emoji-picker-react'
import { UserAvatar } from 'components'
import useMessages from './useMessages'
import Messages from './components/messages/Messages'

const MessagesTab = () => {
  const theme = useMantineTheme()
  const {
    messages,
    threadSummaries,
    isSuccess,
    isLoading,
    targetRef,
    scrollableRef,
    handleSelectThread,
    selectedChannelId,
    selectedUserId
  } = useMessages()

  if (isLoading) {
    return <LoadingOverlay visible />
  }
  return isSuccess && <Box sx={{ height: 500 }}>
    <Grid style={{ height: '100%' }}>
      <Grid.Col span={3} style={{ minHeight: '100%' }}>
        <Paper style={{ minHeight: '100%' }} withBorder shadow="sm" p="md">
          <ScrollArea>
            <Stack>
              <Title order={5} color="dimmed">Groups</Title>
              {
                threadSummaries.channel_summaries.map((channel) => (
                  <UnstyledButton key={`channel-${channel.id}`}
                                  onClick={() => {
                                    handleSelectThread(channel.id, 'channel')
                                  }}
                                  sx={theme => ({
                                    padding: selectedChannelId === channel.id ? '6px 4px' : '7px 5px',
                                    borderRadius: theme.radius.md,
                                    border: selectedChannelId === channel.id ? '1px solid' + (theme.colorScheme === 'light' ? theme.colors['purple'][0] : theme.colors['purple'][7]) : null,
                                    backgroundColor: selectedChannelId === channel.id ? (theme.colorScheme === 'light' ? theme.colors['gray'][0] : theme.colors['purple'][8]) : null,
                                    '&:hover': {
                                      backgroundColor: theme.colorScheme === 'light' ? theme.colors['gray'][1] : theme.colors['gray'][9]
                                    }
                                  })}>
                    <Group>
                      <UserAvatar color="blue" size={40}>{channel.name}</UserAvatar>
                      <div>
                        <Text>{channel.name}</Text>
                        <Text size="xs" color="dimmed"></Text>
                      </div>
                    </Group>
                  </UnstyledButton>
                ))
              }

              {/*              {threadSummaries.userSummaries.map((user) => (
                <ThreadItem
                  key={`user-${user.id}`}
                  avatarId={user.id}
                  avatarName={(user.fullName || user.email)[0]}
                  text={user.fullName || user.email}
                  selected={user.id === selectedUserId}
                  onClick={() => selectThread({ selectedUserId: user.id })}
                  unreadCount={user.unreadCount}
                  lastMessageText={user.lastMessageText}
                  lastMessageTimestamp={user.lastMessageTimestamp}
                />
              ))}*/}

              <Title order={5} color="dimmed">Private Messages</Title>
              {
                threadSummaries.user_summaries.map((user) => (
                  <UnstyledButton key={`user-${user.id}`}
                                  onClick={() => {
                                    handleSelectThread(user.id, 'user')
                                  }}
                                  sx={theme => ({
                                    padding: selectedUserId === user.id ? '6px 4px' : '7px 5px',
                                    borderRadius: theme.radius.md,
                                    border: selectedUserId === user.id ? '1px solid' + (theme.colorScheme === 'light' ? theme.colors['purple'][0] : theme.colors['purple'][7]) : null,
                                    backgroundColor: selectedUserId === user.id ? (theme.colorScheme === 'light' ? theme.colors['gray'][0] : theme.colors['purple'][8]) : null,
                                    '&:hover': {
                                      backgroundColor: theme.colorScheme === 'light' ? theme.colors['gray'][1] : theme.colors['gray'][9]
                                    }
                                  })}>
                    <Group>
                      <UserAvatar color="blue" size={40} userId={user.id}>{user.email}</UserAvatar>
                      <div>
                        <Text>{user.full_name || user.email}</Text>
                        <Text size="xs" color="dimmed">{user.email}</Text>
                      </div>
                    </Group>
                  </UnstyledButton>
                ))
              }
            </Stack>
          </ScrollArea>
        </Paper>
      </Grid.Col>
      {
        messages ? <Grid.Col span={9} style={{ minHeight: '100%' }}>
          {/*chat area*/}
          <Paper withBorder shadow="sm" p="md">
            <Stack spacing="lg">
              {/*current loaded user*/}
              <Paper withBorder p="sm" sx={{ height: '100%', background: theme.colorScheme === 'light' ? theme.colors['gray'][0] : theme.colors['gray'][9] }}>
                <ScrollArea sx={{ height: 'calc(100vh - 350px)' }} viewportRef={scrollableRef} offsetScrollbars>
                  <Stack>
                    <Divider label="new messages" labelPosition="center" />
                    {
                      messages && <Messages messages={messages} />
                    }
                    <div ref={targetRef}></div>
                  </Stack>
                </ScrollArea>
              </Paper>
              <Group sx={{ width: '100%' }}>
                <Popover withArrow shadow="md">
                  <Popover.Target>
                    <Tooltip label="Choose an Emoji">
                      <ActionIcon color="yellow" size="xl"><IconMoodSmile size={30} stroke={1.5} /></ActionIcon>
                    </Tooltip>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <EmojiPicker />
                  </Popover.Dropdown>
                </Popover>
                <TextInput sx={{ flex: 1 }} placeholder="Type a message" size="md" />
                <Tooltip label="Send">
                  <ActionIcon color="purple" size="xl"><IconSend size={30} stroke={1.5} /></ActionIcon>
                </Tooltip>
              </Group>
            </Stack>
          </Paper>
        </Grid.Col> : <Grid.Col span={9} style={{ minHeight: '100%' }}>
          <Paper withBorder shoadow="sm" sx={{ height: 'calc(100vh - 350px)' }}>
            <Center sx={{ height: '100%' }}>
              <Stack align="center">
                <IconMessages size={100} stroke={0.5} />
                <Text size="xl" weight={400}>Please select person to start to chat</Text>
              </Stack>
            </Center>
          </Paper>
        </Grid.Col>
      }
    </Grid>
  </Box>
}
export default MessagesTab