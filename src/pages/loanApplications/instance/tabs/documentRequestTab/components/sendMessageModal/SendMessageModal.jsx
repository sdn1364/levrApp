import { Button, Group, LoadingOverlay, Modal, Stack, Title, Radio } from '@mantine/core'
import useSendMessageModal from './useSendMessageModal'
import { RichTextEditor } from '@mantine/rte'
import UserRadio from './components/userRadio/UserRadio'

const SendMessageModal = () => {
  const {
    docReqId,
    docReq,
    docReqIsSuccess,
    docReqIsLoading, handleCloseSendMessageModal,
    threadSummaries, threadSummariesIsSuccess,
    threadSummariesIsLoading,
    msg, setMsg,
    sendMessage,
    handleChecked
  } = useSendMessageModal()


  return <Modal size="lg" centered opened={docReqId !== null} onClose={handleCloseSendMessageModal}
                title={`Send Chat Message for ${docReqIsSuccess && docReq.name}:`}>
    {
      (docReqIsLoading || threadSummariesIsLoading) && <LoadingOverlay visible />
    }
    <Stack spacing="xl">
      <RichTextEditor
        placeholder="Type Your Message Here"
        value={msg}
        onChange={setMsg}
        id="rte"
        controls={[
          ['bold', 'italic', 'underline', 'link'],
          ['unorderedList', 'h1', 'h2', 'h3'],
          ['alignLeft', 'alignCenter', 'alignRight']
        ]}
      />
      {
        threadSummariesIsSuccess && <>

          <Radio.Group name="selectedUsers"
                       orientation="vertical"
                       label="Select Channel to send to:"
                       spacing={4}
                       onChange={handleChecked}
          >

            <Title order={6}>Groups</Title>
            {
              threadSummaries.channel_summaries.map((channel, index) => (
                <UserRadio userId={`${channel.id}`} val={`channel-${channel.id} `} key={`channel-${index}`} title={channel.name} />
              ))
            }

            <Title order={6}>Users</Title>
            {
              threadSummaries.user_summaries.map((user, index) => (
                <UserRadio userId={`${user.id}`} val={`user-${user.id}`} key={`user-${index}`} title={user.name || user.email} />
              ))
            }
          </Radio.Group>
        </>
      }
      <Group position="apart" mt="lg">
        <Button onClick={handleCloseSendMessageModal} variant="subtle">Cancel</Button>
        <Button onClick={sendMessage}>Send</Button>
      </Group>
    </Stack>
  </Modal>
}

export default SendMessageModal
