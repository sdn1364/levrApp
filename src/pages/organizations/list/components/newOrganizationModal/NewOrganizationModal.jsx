import { Select, TextInput } from '@mantine/core'
import { FormModal } from 'components'
import useNewOrganizationModal from './useNewOrganizationModal'

const NewOrganizationModal = () => {

  const { form, opened, createNewOrganization, closeNewOrganizationModal } = useNewOrganizationModal()

  return <FormModal
    opened={opened}
    onClose={closeNewOrganizationModal}
    title="New Organization"
    onSubmit={form.onSubmit(createNewOrganization)}
  >
    <TextInput
      label="Company Legal Name"
      withAsterisk
      {...form.getInputProps('name')}
    />
    <Select
      label="Organization Type"
      withAsterisk
      {...form.getInputProps('org_type')}
      data={[
        { value: '', label: 'Select' },
        { value: 'ORG_BORROWER', label: 'Borrower' },
        { value: 'ORG_BROKER', label: 'Brokerage' },
        { value: 'ORG_LENDER', label: 'Lender' }
      ]}
    />
  </FormModal>
}
export default NewOrganizationModal