import {Button, Group, Modal, MultiSelect, Stack, TransferList} from "@mantine/core";
import useNewDocReq from "./useNewDocReq";

const NewDocRequestModal = () => {

  const {
    selected,
    handleChangePack,
    handleSetSelected,
    guidePackData,
    opened,
    handleCloseNewDocRequestModal
  } = useNewDocReq()

  return <Modal opened={opened} value={'select'}
                onClose={handleCloseNewDocRequestModal} size="xl" centered
                title="Add Document Request(s) to Loan Application"
  >
    <Stack spacing="xl">
      <MultiSelect searchable clearable data={guidePackData()}
                   placeholder="Select all packs you need" defaultValue={''}
        onChange={(value)=>handleChangePack(value)}
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
      <Group position="apart">
        <Button onClick={handleCloseNewDocRequestModal} variant='subtle'>Cancel</Button>
        <Button>Add</Button>
      </Group>
    </Stack>
  </Modal>
}
export default NewDocRequestModal
