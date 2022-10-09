import {Button, Group, Modal} from "@mantine/core";
import { RichTextEditor } from '@mantine/rte';
import {useSelector} from "react-redux";
import {selectLoanApplicationReminderModal} from "redux/reducer/loanApplication/loanApplicationSlice";
import useLoanApplicationList from "../useLoanApplicationList";
import {useState} from "react";

const LoanApplicationReminderModal = ()=>{
  const opened = useSelector(selectLoanApplicationReminderModal)
  const {closeLoanApplicationReminderModal} = useLoanApplicationList();
  const initialValue =
    '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>';
  const [value, onChange] = useState(initialValue);

  return <Modal
    opened={opened}
    title="Send Email"
    size="lg"
    centered
    onClose={closeLoanApplicationReminderModal}

  >
    <RichTextEditor value={value}
                    onChange={onChange}
                    id="rte"
                    controls={[
                      ['bold', 'italic', 'underline', 'link'],
                      ['unorderedList', 'h1', 'h2', 'h3'],
                      ['alignLeft', 'alignCenter', 'alignRight'],
                    ]}
    />
    <Group position="apart" mt="lg">
      <Button variant="subtle" onClick={closeLoanApplicationReminderModal}>Cancel</Button>
      <Button >send</Button>
    </Group>
  </Modal>
}
export default LoanApplicationReminderModal;