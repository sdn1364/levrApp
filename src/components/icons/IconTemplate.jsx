const IconTemplate = ({ size = 20, children }) => {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
}
export default IconTemplate