import {Box, Text} from "@mantine/core";
import {useSelector} from "react-redux";
import {selectSelectedDocRequest} from "redux/reducer/loanApplication/docRequestSlice";

const DocumentRequestSelected = ()=>{

  const selectedDocRequests = useSelector(selectSelectedDocRequest)


  return selectedDocRequests.length > 0 && <Box sx={theme => ({
      position: 'fixed',
      top: 0,
      left: '50%',
      zIndex: '100',
      padding: 10,
      transform: 'translate(-50%, 0)',
      backgroundColor: theme.colors['brand'][5],
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    })}>
      <Text color="white">
        {selectedDocRequests.length} Selected Items
      </Text>
    </Box>

}
export default DocumentRequestSelected