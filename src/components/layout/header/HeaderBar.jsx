import { Header, Avatar, Menu, UnstyledButton, Group } from '@mantine/core'
import { IconSettings, IconLogout } from '@tabler/icons'
import { Link } from 'react-router-dom'

import { useGetUserQuery } from 'redux/reducer/auth/authApiSlice'
import { BrandLogo } from 'components'
import UserAvatar from './components/UserAvatar'
import useLogin from 'pages/auth/login/useLogin'
import ToggleTheme from './components/ToggleTheme'
import useStyles from './useStyles'

const HeaderBar = () => {

  const { data: user, isSuccess } = useGetUserQuery()

  const { classes } = useStyles()

  const { submitLogOut } = useLogin()


  return <Header className={classes.header} height={60} withBorder>
    <BrandLogo size={40} />
    <Group className={classes.actions}>
      <ToggleTheme />
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton>
            {
              isSuccess ? <UserAvatar userId={user.id} /> : <Avatar />
            }
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{isSuccess ? user.email : null}</Menu.Label>
          <Menu.Item icon={<IconSettings size={14} />} component={Link} to="/profile">Settings</Menu.Item>
          <Menu.Divider />
          <Menu.Item icon={<IconLogout size={14} />} onClick={submitLogOut}>Logout</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  </Header>
}
export default HeaderBar