import { Tooltip, UnstyledButton, useMantineTheme } from '@mantine/core'
import { Link } from 'react-router-dom'
import useStyles from './useStyle'


const NavbarLink = ({ icon: Icon, label, active, to }) => {
  const { classes, cx } = useStyles()
  const theme = useMantineTheme()

  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton to={to} component={Link} className={cx(classes.link, { [classes.active]: active })}>
        <Icon color={active ? theme.colors['purple'][8] : theme.colors['gray'][7]} />
      </UnstyledButton>
    </Tooltip>
  )
}
export default NavbarLink
