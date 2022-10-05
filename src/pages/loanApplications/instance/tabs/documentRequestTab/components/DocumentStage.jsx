import {Accordion, Group, Stack, Text, Button} from "@mantine/core";
import DocumentRequestRow from "./DocumentRequestRow";
import {useGetLoanAppDocRequestOnStageQuery} from "redux/reducer/loanApplication/docRequestApiSlice";
import {useParams} from "react-router-dom";
import {Draggable, Droppable} from "react-beautiful-dnd";
import standardString from "../../../../utilities/StandardString";

const DocumentStage = ({stage}) => {
  const {id} = useParams();
  const {data: documentRequests, isSuccess} = useGetLoanAppDocRequestOnStageQuery({loanAppId: id, stageId: stage.id})


  return isSuccess &&
    <Droppable direction="vertical" droppableId={`stage-${stage.id}`}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Accordion.Item key={stage.id} value={standardString(stage.name)}>
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
            <Accordion.Panel sx={{paddingLeft: -10}}>
              <Accordion variant='separated' chevronPosition='left' multiple>

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
              <Button variant="subtle" mt="lg" compact size="xs">New document request</Button>
            </Accordion.Panel>
          </Accordion.Item>
        </div>
      )
      }
    </Droppable>
}
export default DocumentStage;