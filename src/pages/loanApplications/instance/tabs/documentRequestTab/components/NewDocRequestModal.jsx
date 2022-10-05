import {Modal} from "@mantine/core";
import {useSelector} from "react-redux";
import {selectNewDocRequestModal} from "redux/reducer/loanApplication/docRequestSlice";
import useDocRequestTab from "../useDocRequestTab";

const NewDocRequestModal = ()=>{

  const {handleCloseNewDocRequestModal} = useDocRequestTab();

  const opened = useSelector(selectNewDocRequestModal)
  return <Modal opened={opened} onClose={handleCloseNewDocRequestModal} size="md"
    title="Add Document Request(s) to Loan Application"
  >

  </Modal>
}
export default NewDocRequestModal
