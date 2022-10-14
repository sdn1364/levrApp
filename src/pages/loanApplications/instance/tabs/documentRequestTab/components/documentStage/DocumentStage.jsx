import { Accordion, Stack } from '@mantine/core'
import { Draggable } from 'react-beautiful-dnd'
import { StandardString } from 'utilities'
import useDocumentStage from './useDocumentStage'
import DocumentRequestRow from './components/documentRequestRow/DocumentRequestRow'
import StageAccordionControl from './components/stageAccordionControl/StageAccordionControl'
import { usePermission } from 'hooks'
import { useParams } from 'react-router-dom'

const DocumentStage = ({ stage, docRequestOrderPerStage, allDocRequests, provided }) => {
  const { id } = useParams()
  const { setSearchParams } = useDocumentStage(stage)

  const { canManageDocRequests } = usePermission({ loanAppId: parseInt(id) })

  return <Accordion.Item key={stage.id} value={StandardString(stage.name)}>
    <StageAccordionControl stage={stage} docReqCount={(docRequestOrderPerStage[stage.id] || []).length} />
    <Accordion.Panel sx={{ paddingLeft: -10 }}>
      <div ref={provided.innerRef} {...provided.droppableProps}>
        <Accordion variant="separated" chevronPosition="left" onChange={value => setSearchParams({ documentRequestId: value })}>
          {
            (docRequestOrderPerStage[stage.id] || []).map((docId, index) => {

              const docReq = allDocRequests.filter(items => (items.id === docId))[0]
              if (docReq) {
                return <Draggable key={`doc-request-${docReq.id}`}
                                  draggableId={`docReq_${docReq.id}`}
                                  isDragDisabled={!canManageDocRequests()}
                                  index={index}
                >
                  {(provided, snapshot) => (
                    <DocumentRequestRow index={index}
                                        docReq={docReq}
                                        provided={provided}
                                        snapshot={snapshot}
                                        innerRef={provided.innerRef}
                    />
                  )}
                </Draggable>
              }
            })
          }
          {provided.placeholder}

        </Accordion>
      </div>
    </Accordion.Panel>
  </Accordion.Item>


}
export default DocumentStage
