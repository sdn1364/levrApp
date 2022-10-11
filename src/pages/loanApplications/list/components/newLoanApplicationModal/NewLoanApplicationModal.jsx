import { Group, Modal, Stepper, Button, Stack, TextInput, Text, Select } from '@mantine/core'
import { IconCurrencyDollarCanadian } from '@tabler/icons'
import useNewLoanApplicationModal from './useNewLoanApplicationModal'
import { InviteUsers } from 'components'
import { ROLE_LOANAPP_BORROWER, ROLE_LOANAPP_BROKER, ROLE_LOANAPP_LENDER, ROLE_LOANAPP_VIEWER } from 'roles'

const NewLoanApplicationModal = () => {

  const { form, active, setActive, nextStep, prevStep, opened, closeNewLoanApplicationModal, allOrganizations, createNewLoanApplication } = useNewLoanApplicationModal()

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
            {...form.getInputProps('org_id')}
            placeholder="Select Your Organization"
            searchable
            nothingFound="No options"
            data={allOrganizations()} label="Your Organization for this Loan Application" />
          <TextInput {...form.getInputProps('loan_description')} label="Loan Description (Borrower name and Loan purpose)" />
          <TextInput {...form.getInputProps('requested_amount')} icon={<IconCurrencyDollarCanadian size={14} />} label="Requested Loan Amount (CAD)" />
        </Stack>>
      </Stepper.Step>
      <Stepper.Step label="Invite Users" description="Second Step" allowStepSelect={active > 1}>
        <InviteUsers availableRoles={[ROLE_LOANAPP_BORROWER, ROLE_LOANAPP_BROKER, ROLE_LOANAPP_LENDER, ROLE_LOANAPP_VIEWER]} />
      </Stepper.Step>
    </Stepper>

    <Group position="apart" mt="lg">
      {
        active > 0 ? <Button onClick={prevStep} variant="subtle">Previous step</Button> : <Button variant="subtle" onClick={closeNewLoanApplicationModal}>cancel</Button>
      }
      {
        active === 1 ? <Button type="submit" onClick={form.onSubmit(createNewLoanApplication)}>Save</Button> : <Button type="button" disabled={!form.isValid()} onClick={nextStep}>Next step</Button>
      }
    </Group>

  </Modal>
}
export default NewLoanApplicationModal
