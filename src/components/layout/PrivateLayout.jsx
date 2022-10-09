import { AppShell } from '@mantine/core'
import Sidebar from './sidebar/Sidebar'
import HeaderBar from './header/HeaderBar'

const PrivateLayout = ({ children }) => {
  return (
    <AppShell
      navbar={<Sidebar />}
      header={<HeaderBar />}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          paddingTop: '60px',
          paddingRight: 0,
          paddingLeft: 60
        }

      })}
    >
      {children}
    </AppShell>
  )
}
export default PrivateLayout
