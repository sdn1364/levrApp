import { useGetUserQuery } from '../../../../../../../redux/reducer/auth/authApiSlice'
import SentMessage from '../sentMessage/SentMessage'
import ReceivedMessage from '../receivedMessage/ReceivedMessage'

const Messages = ({ messages }) => {
  const { data: me, isSuccess, isLoading } = useGetUserQuery()

  return isSuccess && <>
    {
      messages && messages.map((message, index) => {
        if (message.from_user === me.id) {
          return <SentMessage key={`sent_${message.id}`} message={message} />
        }
        return <ReceivedMessage key={`received_${message.id}`} message={message} />
      })
    }
  </>
}

export default Messages
