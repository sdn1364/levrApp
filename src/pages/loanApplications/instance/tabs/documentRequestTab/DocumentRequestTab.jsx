import {Accordion, Grid, Paper, Box} from "@mantine/core";
import {useParams} from "react-router-dom";
import {useGetLoanApplicationStagesQuery} from "redux/reducer/loanApplication/loanApplicationApiSlice";
import DocumentStage from "../components/DocumentStage";
import {useState} from "react";
import {usePermission} from "hooks";
import {DragDropContext} from "react-beautiful-dnd";
import useDocRequestTab from "./useDocRequestTab";
import DocumentRequestSelected from "../components/DocumentRequestSelected";
import standardString from "utilities/StandardString";
import {useSelector} from "react-redux";
import {selectDocumentRequestView} from "redux/reducer/loanApplication/docRequestSlice";
import DocumentStageBoard from "../components/DocumentStageBoard";
import {Content} from "components";


const DocumentRequestTab = () => {

  const docRequestView = useSelector(selectDocumentRequestView)

  const {id} = useParams();
  const {data: loanAppStages, isSuccess} = useGetLoanApplicationStagesQuery(id);

  const [setAccordionValue] = useState([]);

  const {canManageDocRequests} = usePermission({loanAppId: id});

  const {handleOnDragEnd} = useDocRequestTab();

  const allTab = () => {
    let stages = [];

    if (isSuccess) {
      stages = loanAppStages.map(stage => standardString(stage.name))
    }

    return stages;
  }

  return isSuccess && <>
    <DocumentRequestSelected/>
    <Box sx={{
      display: 'flex',
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <Box sx={{flex: 1, padding: '20px 520px 20px 50px'}}>
        <Accordion multiple
                   variant='fill'
                   chevronPosition="left"
                   onChange={setAccordionValue}
                   defaultValue={allTab()}
        >
          <DragDropContext
            onDragEnd={handleOnDragEnd}>
            {
              loanAppStages.map((stage) => {
                return <DocumentStage key={`stage-${stage.id}`} stage={stage}/>
              })
            }
          </DragDropContext>
        </Accordion>
      </Box>
      <Paper p="md" withBorder sx={{
        position: 'absolute',
        right: 0,
        top: 0,
        height: '100%',
        width: 500
      }}>
        this is document request panel
      </Paper>
    </Box>
  </>
}

export default DocumentRequestTab;
