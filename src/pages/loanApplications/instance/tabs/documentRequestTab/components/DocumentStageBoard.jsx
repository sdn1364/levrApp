import {useParams} from "react-router-dom";
import {useGetLoanAppDocRequestOnStageQuery} from "redux/reducer/loanApplication/docRequestApiSlice";
import {Group, Paper, Stack, Text, Title, useMantineTheme} from "@mantine/core";
import {Draggable, Droppable} from "react-beautiful-dnd";

const DocumentStageBoard = ({stage})=>{
  const theme = useMantineTheme();

  const {id} = useParams();
  const {data: documentRequests, isSuccess} = useGetLoanAppDocRequestOnStageQuery({loanAppId: id, stageId: stage.id})

  return    isSuccess && <Droppable droppableId={`stage-${stage.id}`}>
    {(provided) => (
      <Stack>
        <Group>
          <Text weight={500} color="dimmed">{stage.name}</Text>
          <Text color="dimmed" inline>
            <Group spacing={4} align="end">
              <Text component="span" size="md" weight={700}>{documentRequests.length > 0 && documentRequests.length}</Text>
              <Text size="xs" component="span">{documentRequests.length > 0 ? (documentRequests.length > 1 ? 'Request' : 'Requests') : 'No Request'}</Text>
            </Group>
          </Text>
        </Group>
        {documentRequests.map((docReq, index) => (
          <Draggable key={`doc-request-${docReq.id}`}
                     draggableId={`docReq_${docReq.id}`}
                     index={index}
          >
            {(provided, snapshot) => (
              <Paper p="xs" shadow="xs"
                     sx={{
                       borderLeft: '5px solid ' + theme.colors[docReq.status][5]
                     }}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}

              >
                {docReq.name}
              </Paper>
            )

            }
          </Draggable>

        ))}
        {provided.placeholder}

      </Stack>
    )
    }
  </Droppable>


}
export default DocumentStageBoard;