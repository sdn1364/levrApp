import { Group, Modal, Stepper, Button, Stack, TextInput, Text, Select } from '@mantine/core'
import { IconCurrencyDollarCanadian } from '@tabler/icons'
import useNewLoanApplicationModal from './useNewLoanApplicationModal'
import { InviteUsers } from 'components'
import { ROLE_LOANAPP_BORROWER, ROLE_LOANAPP_BROKER, ROLE_LOANAPP_LENDER, ROLE_LOANAPP_VIEWER } from 'roles'

const NewLoanApplicationModal = () => {

  const { active, setActive, nextStep, prevStep, opened, closeNewLoanApplicationModal, allOrganizations } = useNewLoanApplicationModal()


  return <Modal opened={opened}
                size="md"
                title="New Loan application"
                centered
                onClose={closeNewLoanApplicationModal}
  >

    <Stepper active={active} onStepClick={setActive} breakpoint="sm" size="sm">
      <Stepper.Step label="Loan Details" description="First Step">
        <Stack spacing="lg">
          <Select
            placeholder="Select Your Organization"
            searchable
            nothingFound="No options"
            data={allOrganizations()} label="Your Organization for this Loan Application" />
          <TextInput label="Loan Description (Borrower name and Loan purpose)" />
          <TextInput icon={<IconCurrencyDollarCanadian size={14} />} label="Requested Loan Amount (CAD)" />
        </Stack>
      </Stepper.Step>
      <Stepper.Step label="Invite Users" description="Second Step" allowStepSelect={active > 1}>
        <InviteUsers availableRoles={[ROLE_LOANAPP_BORROWER, ROLE_LOANAPP_BROKER, ROLE_LOANAPP_LENDER, ROLE_LOANAPP_VIEWER]}
        />
      </Stepper.Step>
      <Stepper.Completed>
        <Stack>
          <Text align="center" size="lg">
            Are these settings correct?
          </Text>
        </Stack>
      </Stepper.Completed>
    </Stepper>

    <Group position="apart" mt="lg">
      {
        active > 0 ? <Button onClick={prevStep} variant="subtle">Previous step</Button> : <Button variant="subtle" onClick={closeNewLoanApplicationModal}>cancel</Button>

      }
      {
        active === 2 ? <Button>Save</Button> : <Button onClick={nextStep}>Next step</Button>
      }
    </Group>
  </Modal>
}
export default NewLoanApplicationModal
