import { Navbar, Stack, Center } from '@mantine/core'
import NavbarLink from './components/NavbarLink'
import { useLocation } from 'react-router-dom'
import useSidebar from './useSidebar'


const Sidebar = () => {
  const location = useLocation()
  const { navLinks, isActive } = useSidebar()

  return (
    <Navbar width={{ base: 60, height: '100%' }} p="sm">

      <Navbar.Section component={Stack} spacing="md">
        {
          navLinks.map((link, index) => {
            return <NavbarLink
              {...link}
              key={link.label}
              active={isActive(link.to, location.pathname)}
              to={link.to}
            />
          })
        }
      </Navbar.Section>

    </Navbar>
  )
}
export default Sidebar