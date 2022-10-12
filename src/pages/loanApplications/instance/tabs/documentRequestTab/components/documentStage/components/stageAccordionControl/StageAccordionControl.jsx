import { Accordion, Group, Text } from '@mantine/core'

const StageAccordionControl = ({ stage, docReqCount }) => {
  return <Accordion.Control>
    <Group>
      <Text weight={500} color="dimmed">{stage.name}</Text>
      <Text color="dimmed" inline>
        <Group spacing={4} align="end">
          <Text component="span" size="md" weight={700}>{docReqCount > 0 && docReqCount}</Text>
          <Text size="xs" component="span">{docReqCount > 0 ? (docReqCount > 1 ? 'Request' : 'Requests') : 'No Request'}</Text>
        </Group>
      </Text>
    </Group>
  </Accordion.Control>
}

export default StageAccordionControl
