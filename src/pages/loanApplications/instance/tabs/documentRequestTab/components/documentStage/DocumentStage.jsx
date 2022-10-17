import { Accordion } from '@mantine/core'
import { Draggable } from 'react-beautiful-dnd'
import { StandardString } from 'utilities'
import useDocumentStage from './useDocumentStage'
import DocumentRequestRow from './components/documentRequestRow/DocumentRequestRow'
import StageAccordionControl from './components/stageAccordionControl/StageAccordionControl'
import { CheckPermission } from 'components'

const DocumentStage = ({ stage, docRequestOrderPerStage, allDocRequests, provided }) => {

  const { setSearchParams } = useDocumentStage(stage)

  return <Accordion.Item key={stage.id} value={StandardString(stage.name)}>
    <StageAccordionControl stage={stage} docReqCount={(docRequestOrderPerStage[stage.id] || []).length} />
    <Accordion.Panel sx={{ paddingLeft: -10 }}>
      <div ref={provided.innerRef} {...provided.droppableProps}>
        <CheckPermission ifUserCan="drag document request" module="loan application">
          {
            ({ permission }) => (

              <Accordion variant="separated" chevronPosition="left" onChange={value => setSearchParams({ documentRequestId: value })}>
                {
                  (docRequestOrderPerStage[stage.id] || []).map((docId, index) => {

                    const docReq = allDocRequests.filter(items => (items.id === docId))[0]
                    if (docReq) {
                      return <Draggable key={`doc-request-${docReq.id}`}
                                        draggableId={`docReq_${docReq.id}`}
                                        isDragDisabled={!permission}
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
            )
          }
        </CheckPermission>
      </div>
    </Accordion.Panel>
  </Accordion.Item>


}
export default DocumentStage
