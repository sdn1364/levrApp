import { IconMail } from '@tabler/icons'
import { Accordion, Button, Group, Box, LoadingOverlay } from '@mantine/core'

import { useState } from 'react'
import useLoanApplicationList from '../../../../../list/useLoanApplicationList'
import useNewDocReqModal from '../newDocRequestModal/useNewDocReqModal'
import DownloadAllButton from '../downloadAll/DownloadAllButton'
import useStages from './useStages'
import { useParams } from 'react-router-dom'
import { useLogger } from '@mantine/hooks'
import { DragDropContext } from 'react-beautiful-dnd'
import DocumentStage from '../documentStage/DocumentStage'

const Stages = () => {
  const { id } = useParams()
  const [setAccordionValue] = useState([])
  const { openLoanApplicationReminderModal } = useLoanApplicationList()
  const { handleOpenNewDocRequestModal } = useNewDocReqModal()

  const { loanAppStages, docRequestOrderPerStage, isSuccess, allDocRequests, allDocReqIsSuccess, handleOnDragEnd, allTab, isLoading, allDocReqIsLoading, docRequestPerStage } = useStages()

  if (isLoading && allDocReqIsLoading) {
    return <LoadingOverlay visible />
  }

  return isSuccess && <>
    <Group pt="lg" pr={537} position="right">
      <DownloadAllButton />
      <Button variant="outline" compact leftIcon={<IconMail size={18} />} onClick={() => openLoanApplicationReminderModal(id)} type="button">Send Message</Button>
      <Button compact onClick={handleOpenNewDocRequestModal}>New Document Request</Button>
    </Group>
    <Box sx={{ flex: 1, padding: '20px 520px 20px 50px' }}>
      <Accordion multiple variant="fill" chevronPosition="left" onChange={setAccordionValue} defaultValue={allTab()}>
        <DragDropContext
          onDragEnd={handleOnDragEnd}>
          {
            loanAppStages.map((stage) => {
              return <DocumentStage key={`stage-${stage.id}`} stage={stage} docRequestOrderPerStage={docRequestPerStage()} allDocRequests={allDocRequests} />
            })
          }
        </DragDropContext>
      </Accordion>
    </Box>
  </>
}
export default Stages



