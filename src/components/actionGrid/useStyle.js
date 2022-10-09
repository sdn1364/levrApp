import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({

  title: {
    fontWeight: 700
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor: theme.colorScheme === 'light' ? theme.colors['gray'][0] : theme.colors.dark[7],
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)'
    }
  }
}))

export default useStyles