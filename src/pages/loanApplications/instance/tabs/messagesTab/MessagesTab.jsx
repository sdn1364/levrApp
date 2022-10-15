import { Box, Grid, Paper, Group, ActionIcon, TextInput, Title, UnstyledButton, ScrollArea, Text, Popover, Tooltip, Stack, useMantineTheme, Divider, LoadingOverlay } from '@mantine/core'
import { IconMoodSmile, IconReload, IconSend } from '@tabler/icons'
import EmojiPicker from 'emoji-picker-react'
import { UserAvatar } from 'components'
import { useLogger } from '@mantine/hooks'
import useMessages from './useMessages'

const MessagesTab = () => {
  const theme = useMantineTheme()
  const { threadSummaries, isSuccess, isLoading, scrollIntoView, targetRef, scrollableRef } = useMessages()
  useLogger('messages', [threadSummaries])

  if (isLoading) {
    return <LoadingOverlay visible />
  }
  return isSuccess && <Box>
    <Grid sx={{ maxHeight: 'calc(100vh - 80px - 160px)' }}>
      <Grid.Col span={3} style={{ maxHeight: '100%' }}>
        <Paper withBorder shadow="sm" p="md" sx={{ height: '100%' }}>
          <ScrollArea sx={{ maxHeight: '100%' }}>
            <Stack>
              <Title order={5} color="dimmed">Groups</Title>
              {
                threadSummaries.channel_summaries.map((channel) => (
                  <UnstyledButton key={`channel-${channel.id}`}>
                    <Group>
                      <UserAvatar color="blue" size={50} userId={channel.id}>{channel.name}</UserAvatar>
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
                  <UnstyledButton key={`user-${user.id}`}>
                    <Group>
                      <UserAvatar color="blue" size={50} userId={user.id}>{user.email}</UserAvatar>
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
      <Grid.Col span={9}>
        {/*chat area*/}
        <Paper withBorder shadow="sm" p="md" sx={{ height: '100%' }}>
          <Stack sx={{ height: '100%' }} spacing="lg">
            {/*current loaded user*/}
            <Paper p="sm" sx={{ background: theme.colorScheme === 'light' ? theme.colors['gray'][0] : theme.colors['gray'][9] }}>
              <Group position="apart">
                <Group>
                  <UserAvatar color="blue" size={30}>soheyl@levrfinance.com</UserAvatar>
                  <Text size="sm">Soheyl Delshad</Text>
                </Group>
                <Tooltip label="Click to load older messages">
                  <ActionIcon color="purple" onClick={() => scrollIntoView()}><IconReload size={16} /></ActionIcon>
                </Tooltip>
              </Group>
            </Paper>
            <Paper withBorder p="sm" sx={{ maxHeight: '100%', background: theme.colorScheme === 'light' ? theme.colors['gray'][0] : theme.colors['gray'][9] }}>
              <ScrollArea style={{ maxHeight: '100%', height: 500 }} viewportRef={scrollableRef}>
                <Stack>
                  <Divider label="new messages" labelPosition="center" />
                  <Group position="right" align="end">
                    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colors['secondary'][3], borderBottomRightRadius: 2 }} p="lg">
                      <Text color="white">This is a message</Text>
                    </Paper>
                    {/*
                    <UserAvatar color="blue" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                  </Group>
                  <Group position="left" align="end">
                    {/*
                    <UserAvatar color="green" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colorScheme === 'light' ? theme.colors['gray'][3] : theme.colors['gray'][7], borderBottomLeftRadius: 2 }} p="lg">
                      <Text>This is a message</Text>
                    </Paper>
                  </Group>
                  <Group position="right" align="end">
                    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colors['secondary'][3], borderBottomRightRadius: 2 }} p="lg">
                      <Text color="white">This is a message</Text>
                    </Paper>
                    {/*
                    <UserAvatar color="blue" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                  </Group>
                  <Group position="left" align="end">
                    {/*
                    <UserAvatar color="green" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colorScheme === 'light' ? theme.colors['gray'][3] : theme.colors['gray'][7], borderBottomLeftRadius: 2 }} p="lg">
                      <Text>This is a message</Text>
                    </Paper>
                  </Group>
                  <Group position="right" align="end">
                    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colors['secondary'][3], borderBottomRightRadius: 2 }} p="lg">
                      <Text color="white">This is a message</Text>
                    </Paper>
                    {/*
                    <UserAvatar color="blue" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                  </Group>
                  <Group position="left" align="end">
                    {/*
                    <UserAvatar color="green" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colorScheme === 'light' ? theme.colors['gray'][3] : theme.colors['gray'][7], borderBottomLeftRadius: 2 }} p="lg">
                      <Text>This is a message</Text>
                    </Paper>
                  </Group>
                  <Group position="right" align="end">
                    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colors['secondary'][3], borderBottomRightRadius: 2 }} p="lg">
                      <Text color="white">This is a message</Text>
                    </Paper>
                    {/*
                    <UserAvatar color="blue" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                  </Group>
                  <Group position="left" align="end">
                    {/*
                    <UserAvatar color="green" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colorScheme === 'light' ? theme.colors['gray'][3] : theme.colors['gray'][7], borderBottomLeftRadius: 2 }} p="lg">
                      <Text>This is a message</Text>
                    </Paper>
                  </Group>
                  <Group position="right" align="end">
                    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colors['secondary'][3], borderBottomRightRadius: 2 }} p="lg">
                      <Text color="white">This is a message</Text>
                    </Paper>
                    {/*
                    <UserAvatar color="blue" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                  </Group>
                  <Group position="left" align="end">
                    {/*
                    <UserAvatar color="green" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colorScheme === 'light' ? theme.colors['gray'][3] : theme.colors['gray'][7], borderBottomLeftRadius: 2 }} p="lg">
                      <Text>This is a message</Text>
                    </Paper>
                  </Group> <Group position="right" align="end">
                  <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colors['secondary'][3], borderBottomRightRadius: 2 }} p="lg">
                    <Text color="white">This is a message</Text>
                  </Paper>
                  {/*
                    <UserAvatar color="blue" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                </Group>
                  <Group position="left" align="end">
                    {/*
                    <UserAvatar color="green" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colorScheme === 'light' ? theme.colors['gray'][3] : theme.colors['gray'][7], borderBottomLeftRadius: 2 }} p="lg">
                      <Text>This is a message</Text>
                    </Paper>
                  </Group>
                  <Group position="right" align="end">
                    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colors['secondary'][3], borderBottomRightRadius: 2 }} p="lg">
                      <Text color="white">This is a message</Text>
                    </Paper>
                    {/*
                    <UserAvatar color="blue" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                  </Group>
                  <Group position="left" align="end">
                    {/*
                    <UserAvatar color="green" size={50}>soheyl@levrfinance.com</UserAvatar>
*/}
                    <Paper radius="md" shadow="xs" sx={{ maxWidth: '50%', background: theme.colorScheme === 'light' ? theme.colors['gray'][3] : theme.colors['gray'][7], borderBottomLeftRadius: 2 }} p="lg">
                      <Text>This is a message</Text>
                    </Paper>
                  </Group>

                  <div ref={targetRef}>end of chat</div>
                </Stack>
              </ScrollArea>
            </Paper>
            <Group>
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
              <TextInput placeholder="Type a message" size="md" sx={{ flex: 1 }} />
              <Tooltip label="Send">
                <ActionIcon color="purple" size="xl"><IconSend size={30} stroke={1.5} /></ActionIcon>
              </Tooltip>
            </Group>
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  </Box>
}
export default MessagesTab