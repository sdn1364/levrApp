import {Button, Group, Modal, Select, Stack, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import useOrganizationList from "./useOrganizationList";

const NewOrganizationModal = ({opened, closeModal})=>{

  const form = useForm({
    initialValues: {
      name: '',
      org_type: ''
    }
  })
  const {createNewOrganization} = useOrganizationList();

  return <Modal
    opened={opened}
    onClose={closeModal}
    title="New Organization"
    centered
  >
    <form onSubmit={form.onSubmit(createNewOrganization)}>
      <Stack spacing="md">
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
          defaultValue="ORG_BORROWER"
        />
      </Stack>

    <Group position="apart" sx={{marginTop: 30}}>
      <Button variant="transparent" onClick={closeModal}>Cancel</Button>
      <Button type="submit" variant="primary">Create</Button>
    </Group>
    </form>
  </Modal>
}
export default NewOrganizationModal;