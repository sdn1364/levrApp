import {useEffect} from "react";
import {useLocation, Navigate, Outlet} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";

import {selectCurrentToken, setCredentials} from "redux/reducer/auth/authSlice";
import {PrivateLayout} from "components";

const RequireAuth = () => {
  const dispatch = useDispatch();

  let token = useSelector(selectCurrentToken);
  let value = localStorage.getItem('_auth_token');


  useEffect(() => {

    if(!token){

      dispatch(setCredentials({key: value}))
    }
  }, [token]);


  const location = useLocation();

  return (
    token || value
      ? <PrivateLayout><Outlet/></PrivateLayout>
      : <Navigate to='/login' state={{from: location}} replace/>
  )

}
export default RequireAuth;