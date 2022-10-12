import { createStyles, Group, Paper, Stack } from '@mantine/core'

const useStyles = createStyles((theme, { haveTabs }) => ({
  heading: {
    height: 'auto',
    borderBottom: `solid 1px ${theme.colors.gray[2]}`,
    padding: haveTabs ? '30px 50px 10px 50px' : '30px 50px'
  }
}))

const Heading = ({ children, tabs, style }) => {

  const { classes } = useStyles({ haveTabs: tabs !== undefined })

  return <Paper style={style} className={classes.heading} radius="0">
    <Group position="apart" mb={tabs ? 15 : 0}>
      {children}
    </Group>
    {tabs}
  </Paper>
}
export default Heading
