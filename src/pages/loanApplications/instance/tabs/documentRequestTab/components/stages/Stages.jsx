import { IconMail } from '@tabler/icons'
import { Accordion, Button, Group, Box, LoadingOverlay } from '@mantine/core'

import useLoanApplicationList from '../../../../../list/useLoanApplicationList'
import useNewDocReqModal from '../newDocRequestModal/useNewDocReqModal'
import DownloadAllButton from '../downloadAll/DownloadAllButton'
import useStages from './useStages'
import { useParams } from 'react-router-dom'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import DocumentStage from '../documentStage/DocumentStage'

const Stages = () => {
  const { id } = useParams()

  const { openLoanApplicationReminderModal } = useLoanApplicationList()
  const { handleOpenNewDocRequestModal } = useNewDocReqModal()

  const { loanAppStages, isSuccess, allDocRequests, handleOnDragEnd, allTab, isLoading, allDocReqIsLoading, docRequestOrderPerStage } = useStages()


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
      <Accordion multiple variant="fill" chevronPosition="left" defaultValue={allTab()}>
        <DragDropContext
          onDragEnd={handleOnDragEnd}>
          {
            loanAppStages.map((stage) => {
              return <Droppable direction="vertical" key={`stage-${stage.id}`} droppableId={`stage-${stage.id}`}>
                {
                  (provided) => (<DocumentStage provided={provided} stage={stage} docRequestOrderPerStage={docRequestOrderPerStage} allDocRequests={allDocRequests} />)
                }

              </Droppable>
            })
          }
        </DragDropContext>
      </Accordion>
    </Box>
  </>
}
export default Stages



