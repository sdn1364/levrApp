import { AppShell } from '@mantine/core'
import Sidebar from './sidebar/Sidebar'
import HeaderBar from './header/HeaderBar'
import { useSelector } from 'react-redux'
import { selectSidebarStat } from '../../redux/reducer/SidebarSlice'

const PrivateLayout = ({ children }) => {
  const sideBarState = useSelector(selectSidebarStat)

  return (
    <AppShell
      navbar={<Sidebar />}
      header={<HeaderBar />}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          paddingTop: '60px',
          paddingRight: 0,
          paddingLeft: sideBarState ? 210 : 60
        }

      })}
    >
      {children}
    </AppShell>
  )
}
export default PrivateLayout
