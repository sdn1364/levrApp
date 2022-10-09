import { Accordion, Group, Text } from '@mantine/core'
import DocumentRequestRow from './documentRequestRow/DocumentRequestRow'
import { useGetLoanAppDocRequestOnStageQuery } from 'redux/reducer/loanApplication/docRequestApiSlice'
import { useParams, useSearchParams } from 'react-router-dom'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { StandardString } from 'utilities'
import { setLoadingLoanApplication } from 'redux/reducer/loanApplication/loanApplicationSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const DocumentStage = ({ stage }) => {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: documentRequests, isSuccess, isLoading } = useGetLoanAppDocRequestOnStageQuery({ loanAppId: id, stageId: stage.id }, {skip: stage=== null})

  const dispatch = useDispatch()
  useEffect(() => {
    if (!isLoading) {
      dispatch(setLoadingLoanApplication(
        {
          step: 'Loading Document Requests',
          percent: {
            doRequest: 1
          }
        }
      ))
    }
  }, [isLoading])

  return isSuccess &&
    <Droppable direction="vertical" droppableId={`stage-${stage.id}`}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Accordion.Item key={stage.id} value={StandardString(stage.name)}>
            <Accordion.Control>
              <Group>
                <Text weight={500} color="dimmed">{stage.name}</Text>
                <Text color="dimmed" inline>
                  <Group spacing={4} align="end">
                    <Text component="span" size="md" weight={700}>{documentRequests.length > 0 && documentRequests.length}</Text>
                    <Text size="xs" component="span">{documentRequests.length > 0 ? (documentRequests.length > 1 ? 'Request' : 'Requests') : 'No Request'}</Text>
                  </Group>
                </Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel sx={{ paddingLeft: -10 }}>
              <Accordion variant="separated" chevronPosition="left" onChange={value => setSearchParams({ documentRequestId: value })}>

                {documentRequests.map((docReq, index) => (
                  <Draggable key={`doc-request-${docReq.id}`}
                             draggableId={`docReq_${docReq.id}`}
                             index={index}
                  >
                    {(provided, snapshot) => (
                      <DocumentRequestRow index={index}
                                          docReq={docReq}
                                          provided={provided}
                                          snapshot={snapshot}
                                          innerRef={provided.innerRef}
                      />
                    )

                    }
                  </Draggable>

                ))}
                {provided.placeholder}

              </Accordion>
            </Accordion.Panel>
          </Accordion.Item>
        </div>
      )
      }
    </Droppable>
}
export default DocumentStage