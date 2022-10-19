import { TimeAgo } from 'components'
import { useParams, useSearchParams } from 'react-router-dom'
import { useGetChatMessageListQuery, useGetLoanAppThreadSummariesQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { useEffect, useState } from 'react'
import { useScrollIntoView } from '@mantine/hooks'
import { useGetUserQuery } from 'redux/reducer/auth/authApiSlice'

const useMessages = () => {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams({
    selectedChannelId: 0,
    selectedUserId: 0
  })
  const selectedChannelId = parseInt(
    searchParams.get('selectedChannelId') || '0',
    10
  )

  const selectedUserId = parseInt(
    searchParams.get('selectedUserId') || '0',
    10
  )

  const [messages, setMessages] = useState(null)

  const { data: me, isSuccess: userIsSuccess } = useGetUserQuery()
  const { data: chatWithChannel, isSuccess: chatWithChannelIsSuccess, isLoading: chatWithChannelIsLoading, refetch: refetchChatWithChannel } = useGetChatMessageListQuery({
    loanApplicationId: id,
    toChannelId: selectedChannelId,
    fromUserId: userIsSuccess ? me.id : ''
  }, { skip: selectedChannelId === 0 })
  const { data: chatWithUser, isSuccess: chatWithUserIsSuccess, isLoading: chatWithUserIsLoading, refetch: refetchChatWithUser } = useGetChatMessageListQuery({
    loanApplicationId: id,
    toUserId: selectedUserId,
    fromUserId: userIsSuccess ? me.id : ''
  }, { skip: selectedUserId === 0 })
  const { data: chatWithRecepient, isSuccess: chatWithRecepientIsSuccess, isLoading: chatWithRecepientIsLoading, refetch: refetchChatWithRecepient } = useGetChatMessageListQuery({
    loanApplicationId: id,
    fromUserId: selectedUserId,
    toUserId: userIsSuccess ? me.id : ''
  }, { skip: selectedUserId === 0 })

// ======================================== scroll to bottom
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView({ duration: 0, easing: () => (0) })
  const { data: threadSummaries, isSuccess, isLoading } = useGetLoanAppThreadSummariesQuery(id)

  useEffect(() => {
    scrollIntoView()
  }, [])

  useEffect(() => {
    if (chatWithChannelIsSuccess && chatWithChannel !== 0) {
      setMessages(chatWithChannel)
    } else if (chatWithUserIsSuccess && chatWithUser !== 0) {
      setMessages(chatWithUser)
    }
  }, [chatWithChannel, chatWithUser, chatWithChannelIsSuccess, chatWithUserIsSuccess, messages])

  // ======================================== end of scroll to bottom

  /*
    function wrangleMessages({ allMessages, selectedChannelId, selectedUserId }) {
      const filtered = Object.values(allMessages)
        .filter((message) => {
          if (selectedChannelId) {
            return message.toChannel === selectedChannelId
          }
          return (
            message.toChannel === null &&
            (message.toUser === selectedUserId ||
              message.fromUser === selectedUserId)
          )
        })
        .map((message) => {
          const timestamp = new Date(message.timestamp)
          const timeAgo = new TimeAgo('en-US')
          return {
            ...message,
            timestamp,
            date: timestamp.toLocaleDateString(),
            timeAgo: timeAgo.format(timestamp)
          }
        })
        .sort((a, b) => a.timestamp - b.timestamp)

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index
      }

      const dates = filtered.map((message) => message.date).filter(onlyUnique)
      let result = []

      for (let date of dates) {
        result = [
          ...result,
          {
            messageText: date,
            fromSystem: true
          },
          ...filtered.filter((message) => message.date === date)
        ]
      }

      return result
    }

  */

  const handleSelectThread = (id, recipient) => {
    if (recipient === 'user') {

      setSearchParams({ selectedUserId: id })
      refetchChatWithUser()
    } else {
      setSearchParams({ selectedChannelId: id })
      refetchChatWithChannel()
    }
    setMessages(null)
  }

  console.log(chatWithChannel)
  console.log(chatWithUser)
  console.log(chatWithRecepient)


  return {
    messages,
    targetRef,
    scrollableRef,
    threadSummaries,
    isSuccess,
    isLoading,
    selectedChannelId,
    selectedUserId,
    handleSelectThread
  }
}

export default useMessages
