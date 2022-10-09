import { IconShop, IconSliderVertical, IconHome } from 'components'

const useSidebar = () => {

  const navLinks = [
    {
      icon: IconHome,
      label: 'Dashboard',
      to: '/'
    },
    {
      icon: IconShop,
      label: 'Organizations',
      to: 'organizations'
    },
    {
      icon: IconSliderVertical,
      label: 'Loan Applications',
      to: 'loan-applications'
    }
  ]

  const isActive = (link, path) => {
    let regex = new RegExp(`^/${link}.*`)
    return regex.test(path)
  }
  return {
    navLinks,
    isActive
  }
}
export default useSidebar