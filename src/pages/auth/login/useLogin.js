import {setCredentials} from "redux/reducer/auth/authSlice";
import {useLocation, useNavigate} from "react-router-dom";
import {useLoginMutation} from "redux/reducer/auth/authApiSlice";
import {useDispatch} from "react-redux";
import {showNotification} from "@mantine/notifications";
import {logOut} from "redux/reducer/auth/authSlice";
import {apiSlice} from "redux/api/apiSlice";

const useLogin = ()=>{

  const navigate = useNavigate();

  const [login,{isLoading}] = useLoginMutation();

  const dispatch = useDispatch();

  const location = useLocation();

  const submitLoginForm = async (data)=>{
    await login(data).unwrap()
      .then((userData) => {
        dispatch(setCredentials({...userData, email: userData.email}))

        localStorage.setItem('_auth_token', userData.key)

        if(location.state){
          navigate(location.state.from.pathname);
        }else{
          navigate('/')
        }
      })
      .catch((error) => {
        if(error?.data?.email){
          showNotification({
            title: 'Login Error',
            message: error.data.email,
            color: 'red',
          })
        }else if(error?.data.non_field_errors){
          showNotification({
            title: 'Login Error',
            message: error?.data.non_field_errors,
            color: 'red',
          })
        }
      })
  }

  const submitLogOut = ()=>{
   dispatch(apiSlice.util.resetApiState());
   dispatch(logOut());
   localStorage.removeItem('_auth_token');
   navigate('/login');

  }

return {submitLoginForm,submitLogOut, isLoading}
}
export default useLogin;