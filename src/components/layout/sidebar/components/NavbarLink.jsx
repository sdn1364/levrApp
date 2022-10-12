import { Group, Tooltip, UnstyledButton, useMantineTheme, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import useStyles from './useStyle'
import { useSelector } from 'react-redux'
import { selectSidebarStat } from '../../../../redux/reducer/SidebarSlice'


const NavbarLink = ({ icon: Icon, label, active, to }) => {
  const { classes, cx } = useStyles()
  const theme = useMantineTheme()
  const sideBarState = useSelector(selectSidebarStat)

  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      {
        sideBarState
          ? <UnstyledButton to={to} component={Link} className={cx(classes.linkWide, { [classes.active]: active })} px="sm">
            <Group position="left">
              <Icon color={active ? (theme.colorScheme === 'light' ? theme.colors['secondary'][5] : theme.colors['purple'][2]) : theme.colors['gray'][7]} />
              <Text size="sm">{label}</Text>
            </Group>
          </UnstyledButton>
          : <UnstyledButton to={to} component={Link} className={cx(classes.link, { [classes.active]: active })}>
            <Icon color={active ? (theme.colorScheme === 'light' ? theme.colors['secondary'][5] : theme.colors['purple'][2]) : theme.colors['gray'][7]} />
          </UnstyledButton>
      }

    </Tooltip>
  )
}
export default NavbarLink
