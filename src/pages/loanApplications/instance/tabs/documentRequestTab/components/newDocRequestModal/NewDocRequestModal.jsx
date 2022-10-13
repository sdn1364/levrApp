import { Button, Group, Modal, MultiSelect, Stack, Title, TransferList, Text } from '@mantine/core'
import useNewDocReqModal from './useNewDocReqModal'

const NewDocRequestModal = () => {

  const {
    selected,
    handleChangePack,
    handleSetSelected,
    guidePackData,
    opened,
    handleCloseNewDocRequestModal,
    shouldShowPersonSelect
  } = useNewDocReqModal()


  //console.log(selected)

  return <Modal opened={opened} value={'select'}
                onClose={handleCloseNewDocRequestModal} size="xl" centered
                title="Add Document Request(s) to Loan Application"
  >
    <Stack spacing="xl">

      <MultiSelect shadow="xl" searchable clearable data={guidePackData()}
                   placeholder="Select all packs you need" defaultValue={''}
                   onChange={(value) => handleChangePack(value)}
      />
      <TransferList
        listHeight={200}
        value={selected}
        onChange={(value) => handleSetSelected(value)}
        searchPlaceholder="Search..."
        nothingFound="No guides selected"
        titles={['All Guides', 'Selected Guides']}
        breakpoint="sm"
      />
      {
        shouldShowPersonSelect && <Stack>
          <Stack>
            <Title order={5}>Personal documents selected</Title>
            <Text size="sm" color="dimmed"></Text>
          </Stack>
        </Stack>
      }

      <Group position="apart">
        <Button onClick={handleCloseNewDocRequestModal} variant="subtle">Cancel</Button>
        <Button>Add</Button>
      </Group>
    </Stack>
  </Modal>
}
export default NewDocRequestModal
