import { Card, Text, SimpleGrid, UnstyledButton, Group } from '@mantine/core'
import useStyles from './useStyle'
import useActionGrid from './useActionGrid'


export function ActionsGrid() {
  const { classes, theme } = useStyles()
  const { data } = useActionGrid()

  const items = data.map((item) => (
    <UnstyledButton key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ))

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group position="apart">
        <Text className={classes.title}>Services</Text>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  )
}

export default ActionsGrid
