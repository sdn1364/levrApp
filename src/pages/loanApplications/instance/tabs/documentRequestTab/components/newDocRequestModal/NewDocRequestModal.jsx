import { Button, Group, Modal, MultiSelect, Stack, Title, TransferList, Text } from '@mantine/core'
import useNewDocReqModal from './useNewDocReqModal'
import { RenderIf } from '../../../../../../../utilities'

const NewDocRequestModal = () => {

  const {
    selected,
    handleChangePack,
    handleSetSelected,
    guidePackData,
    opened,
    handleCloseNewDocRequestModal,
    showPerson
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
      <RenderIf isTrue={showPerson}>
        <Stack>
          <Stack>
            <Title order={5}>Personal documents selected</Title>
            <Text size="sm" color="dimmed"></Text>
          </Stack>
        </Stack>
      </RenderIf>
  
      <Group position="apart">
        <Button onClick={handleCloseNewDocRequestModal} variant="subtle">Cancel</Button>
        <Button>Add</Button>
      </Group>
    </Stack>
  </Modal>
}
export default NewDocRequestModal
