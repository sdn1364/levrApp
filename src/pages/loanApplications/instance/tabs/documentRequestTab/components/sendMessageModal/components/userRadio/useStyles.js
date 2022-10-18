import { createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  button: {
    display: 'flex',
    width: '100%',
    paddingLeft: 10,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    '&:checked': {
      '&>label': {
        border: '1px solid' + theme.colors['purple'][5]
      }
    },
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0]
    },
    '&>label': {
      cursor: 'pointer',
      width: '100%',
      height: '100%',
      padding: theme.spacing.sm

    }
  }
}))
export default useStyles
