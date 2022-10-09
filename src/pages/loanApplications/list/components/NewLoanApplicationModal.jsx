import {Group, Modal, Stepper, Button, Stack, TextInput} from "@mantine/core";
import {useSelector} from "react-redux";
import {selectNewLoanApplicationModal} from "redux/reducer/loanApplication/loanApplicationSlice";
import useLoanApplicationList from "../useLoanApplicationList";
import {useState} from "react";
import {IconCurrencyDollarCanadian} from "@tabler/icons";

const NewLoanApplicationModal = () => {

  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const opened = useSelector(selectNewLoanApplicationModal)

  const {closeNewLoanApplicationModal} = useLoanApplicationList()


  return <Modal opened={opened}
                size="lg"
                title="New Loan application"
                centered
                onClose={closeNewLoanApplicationModal}
  >

    <Stepper active={active} onStepClick={setActive} breakpoint="sm">
      <Stepper.Step label="First step" description="Loan Details">
        <Stack spacing="lg">
          <TextInput label="Your Organization for this Loan Application"/>
          <TextInput label="Loan Description (Borrower name and Loan purpose)"/>
          <TextInput icon={<IconCurrencyDollarCanadian size={14} />}  label="Requested Loan Amount (CAD)"/>
        </Stack>
      </Stepper.Step>
      <Stepper.Step label="Second step" description="Invite Users">
        Step 2 content: Verify email
      </Stepper.Step>
      <Stepper.Completed>
        Completed, click back button to get to previous step
      </Stepper.Completed>
    </Stepper>

    <Group position="apart" mt="lg">
      <Button variant="subtle" onClick={closeNewLoanApplicationModal}>cancel</Button>
      <Button onClick={nextStep}>Next step</Button>
    </Group>
  </Modal>
}
export default NewLoanApplicationModal;