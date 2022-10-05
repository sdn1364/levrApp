import {Button, Group, Modal, Text} from "@mantine/core";
import {useSelector} from "react-redux";
import {selectDeleteDocReqModal} from "redux/reducer/loanApplication/docRequestSlice";
import useDocRequestTab from "../useDocRequestTab";
import {useGetOneDocRequest} from "../../../../../../redux/reducer/loanApplication/docRequestApiSlice";


const ConfirmDocReqDeleteModal = ()=>{

  const {handleCloseDocReqDeleteConfirmModal} = useDocRequestTab();

  const docRequestId = useSelector(selectDeleteDocReqModal)

const {data: docRequest, isSuccess} = useGetOneDocRequest(docRequestId);

  return <Modal centered
                opened={docRequestId !== null}
                onClose={handleCloseDocReqDeleteConfirmModal}
                title="Are you sure you want to delete this Document Request?"
  >
    {
      isSuccess && <Text>
        You are about to delete{" "}'{docRequest.name}'
      </Text>
    }
    <Group position="apart">
      <Button onClick={handleCloseDocReqDeleteConfirmModal} variant='subtle'>Cancel</Button>
      <Button color="red">Delete</Button>
    </Group>
  </Modal>
}
export default ConfirmDocReqDeleteModal
