import {Modal} from "@mantine/core";
import {selectSendEmailModal} from "redux/reducer/loanApplication/docRequestSlice";
import {useSelector} from "react-redux";
import useDocRequestTab from "../useDocRequestTab";
const SendEmailModal = ()=>{
  const opened = useSelector(selectSendEmailModal)
  const {handleCloseSendEmailModal} = useDocRequestTab()

  return <Modal opened={opened !== null} onClose={handleCloseSendEmailModal}>

  </Modal>
}
export default SendEmailModal;