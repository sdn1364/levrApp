import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForgotMutation} from "../../../redux/reducer/auth/authApiSlice";
import {useDispatch} from "react-redux";

const useForgot = ()=>{

  const [forgotError, setForgotError] =useState();

  const navigate = useNavigate();
  const [forgot, {isLoading}] = useForgotMutation();

  const submitForgotForm = async (data)=>{
    await forgot(data).unwrap()
      .then((res)=>{
        console.log(res)
      })
  }

  return {submitForgotForm}
}

export default useForgot;