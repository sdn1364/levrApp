import { createStyles } from '@mantine/core'


const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.sm,
    paddingRight: theme.spacing.sm,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actions: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export default useStyles