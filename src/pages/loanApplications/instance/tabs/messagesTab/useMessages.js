import { TimeAgo } from 'components'
import { useParams, useSearchParams } from 'react-router-dom'
import { useGetChatMessageListQuery, useGetLoanAppThreadSummariesQuery } from 'redux/reducer/loanApplication/loanApplicationApiSlice'
import { useEffect } from 'react'
import { useScrollIntoView } from '@mantine/hooks'

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

  const { data: chatWithChannel, isSuccess: chatWithChannelIsSuccess, isLoading: chatWithChennelIsLoading } = useGetChatMessageListQuery({
    loanApplicationId: id
  })

// ======================================== scroll to bottom
  const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView()
  const { data: threadSummaries, isSuccess, isLoading } = useGetLoanAppThreadSummariesQuery(id)
  useEffect(() => {
    scrollIntoView({ easing: 0 })

  }, [scrollIntoView, selectedChannelId, selectedUserId])

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


    const messages = wrangleMessages({
      //allMessages,
      selectedChannelId,
      selectedUserId
    })
  */

  return { scrollIntoView, targetRef, scrollableRef, threadSummaries, isSuccess, isLoading }
}

export default useMessages
