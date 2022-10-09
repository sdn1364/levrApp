import {Group, Paper, Stack, TextInput, Title, Button, Text, Select} from "@mantine/core";
import {useParams} from "react-router-dom";
import {useForm} from "@mantine/form";

import {useGetOneOrganizationQuery} from "redux/reducer/organizations/organizationsApiSlice";
import useOrganizationsInformation from "./useOrganizationsInformation";
import {useLogger} from "@mantine/hooks";


const OrganizationsInformation = () => {
  const {id} = useParams()
  const {data: organization, isSuccess} = useGetOneOrganizationQuery(id);

  const nameForm = useForm({
    initialValues: {
      name: organization?.name
    }
  });

  const typeForm = useForm({
    initialValues: {
      org_type: organization?.org_type
    }
  })

  const {
    handleUpdateOrganizationName,
    handleUpdateOrganizationType,
    handleDeleteOrganization
  } = useOrganizationsInformation(id);

  return isSuccess && <Stack spacing="lg">
    <Title order={4}>Organization Information</Title>
    <Paper p="md" withBorder>

      <form onSubmit={nameForm.onSubmit(handleUpdateOrganizationName)}>
        <Stack spacing="md">
          <TextInput label="Organization Name"
                     {...nameForm.getInputProps('name')}
          />

          <Group position="right">
            <Button type="submit" variant="subtle">Change Name</Button>
          </Group>
        </Stack>
      </form>

    </Paper>
    <Paper p="md" withBorder>
      <form onSubmit={typeForm.onSubmit(handleUpdateOrganizationType)}>
        <Stack spacing="md">

          <Select data={[
            {value: '', label: 'Select'},
            {value: 'ORG_BORROWER', label: 'Borrower'},
            {value: 'ORG_BROKER', label: 'Brokerage'},
            {value: 'ORG_LENDER', label: 'Lender'}
          ]}
                  {...typeForm.getInputProps('org_type')}
                  label="Organization Type"
          />
          <Group position="right">
            <Button type="submit" variant="subtle">Change Type</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
    <Title order={5} color="red.5">Danger zone</Title>
    <Paper p="md" withBorder>
      <form onSubmit={typeForm.onSubmit(handleUpdateOrganizationType)}>
        <Stack spacing="md">
          <Text>
            Once you delete your account, there is no going back. Please be certain.
          </Text>
          <Group position="left">
            <Button type="submit" variant="outline" color="red.5" onClick={handleDeleteOrganization}>Delete Organization</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  </Stack>

}
export default OrganizationsInformation;