import './App.css'
import { Layout } from 'components'
import { Routes, Route } from 'react-router-dom'
import { Forgot, LoanApplicationsList, Login, OrganizationInstance, OrganizationList, ProfileSettings, Dashboard } from './pages'
import { RequireAuth } from 'components'
import { theme } from './theme'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import LoanApplicationInstance from './pages/loanApplications/instance/LoanApplicationInstance'
import { useLocalStorage } from '@mantine/hooks'

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true
  })


  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ ...theme, colorScheme: colorScheme }}>
        <NotificationsProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/*public routes*/}
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<Forgot />} />
              {/*protected routes*/}
              <Route element={<RequireAuth />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="loan-applications">
                  <Route index element={<LoanApplicationsList />} />
                  <Route path=":id" element={<LoanApplicationInstance />}>
                    <Route path=":tab" element={<LoanApplicationInstance />} />
                  </Route>
                </Route>
                <Route path="organizations">
                  <Route index element={<OrganizationList />} />
                  <Route path=":id" element={<OrganizationInstance />}>
                    <Route path=":tab" element={<OrganizationInstance />} />
                  </Route>
                </Route>
                <Route path="profile">
                  <Route index element={<ProfileSettings />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App

