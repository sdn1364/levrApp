import usePermission from './usePermission'
import { cloneElement } from 'react'

const CheckPermission = ({ children, ifUserCan, denied, module, moduleId }) => {

  const { userHasPermission } = usePermission(module, moduleId)

  if (typeof children === 'function') {
    return cloneElement(children({ permission: userHasPermission(ifUserCan) }), {})
  }
  return userHasPermission(ifUserCan)
    ? <>{children} </>
    : <> {null ?? denied}</>
}
export default CheckPermission
