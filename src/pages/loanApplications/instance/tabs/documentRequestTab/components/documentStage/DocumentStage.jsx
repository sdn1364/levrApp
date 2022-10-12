import { Accordion } from '@mantine/core'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { StandardString } from 'utilities'
import useDocumentStage from './useDocumentStage'
import DocumentRequestRow from './components/documentRequestRow/DocumentRequestRow'
import StageAccordionControl from './components/stageAccordionControl/StageAccordionControl'
import { usePermission } from 'hooks'
import { useParams } from 'react-router-dom'

const DocumentStage = ({ stage, docRequestOrderPerStage, allDocRequests }) => {
  const { id } = useParams()
  const {
    setSearchParams
  } = useDocumentStage(stage)

  const { canManageDocRequests } = usePermission({ loanAppId: id })

  return <Droppable direction="vertical" droppableId={`stage-${stage.id}`}>
    {(provided) => (<div ref={provided.innerRef} {...provided.droppableProps}>
      <Accordion.Item key={stage.id} value={StandardString(stage.name)}>
        <StageAccordionControl stage={stage} docReqCount={(docRequestOrderPerStage[stage.id] || []).length} />
        <Accordion.Panel sx={{ paddingLeft: -10 }}>
          <Accordion variant="separated" chevronPosition="left" onChange={value => setSearchParams({ documentRequestId: value })}>

            {
              docRequestOrderPerStage[stage.id].map((docId, index) => {

                const docReq = allDocRequests.filter(items => (items.id === docId))

                return <Draggable key={`doc-request-${docReq.id}`}
                                  draggableId={`docReq_${docReq.id}`}
                                  isDragDisabled={!canManageDocRequests()}
                                  index={index}
                >
                  {(provided, snapshot) => (<DocumentRequestRow index={index}
                                                                docReq={docReq}
                                                                provided={provided}
                                                                snapshot={snapshot}
                                                                innerRef={provided.innerRef}
                  />)}
                </Draggable>

              })
            }
            {provided.placeholder}
          </Accordion>
        </Accordion.Panel>
      </Accordion.Item>
    </div>)}
  </Droppable>
}
export default DocumentStage
