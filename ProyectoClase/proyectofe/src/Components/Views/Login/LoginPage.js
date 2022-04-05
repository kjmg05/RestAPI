import LogIn from "./Login";
import { useState } from "react";
import { publicAxios } from "../../../Lib/apiClient";
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../UX/Loading/Loading";

const LoginPage = () => {
    const {isLoading, errors} = useSelector((state) => {return state.security});
    const dispatch = useDispatch();
    const [txtCorreo, setTextCorreo] = useState('');
    const [txtPw, setTextPw] = useState('');
    const onChangeHandler = ({target: {name, value}}) => {
        switch (name) {
            case 'txtCorreo':
                setTextCorreo(value);
                break;
            case 'txtPassword':
                setTextPw(value);    
            break;
        }
    }
    const onConfirm = async (e) => {
        e.preventDefault(); //ignora enter en blanco
        e.stopPropagation();
        try {
            dispatch({type: 'ON_LOGIN_LOADING', payload:{}});
            const data = await publicAxios.post('/api/v1/seguridad/login', {email: txtCorreo, password: txtPw});
            console.log('signin' , data.data);
            const  {jwt: jwtToken, ...user} = data.data;
            dispatch({type:'ON_LOGIN_SUCCESS', payload: {jwtToken, ...user}});
        } catch (ex) {
            dispatch({type:'ON_LOGIN_ERROR', payload:{errors:['Error loser']}})
            console.log('Error', ex);
        }
        
    }

    const onCancel = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    return (
        <>
            {isLoading && <Loading/>}
            <LogIn
        txtCorrreoValue = {txtCorreo}
        txtPasswordValue = {txtPw}
        onChange = {onChangeHandler}
        errorTxtCorreo = ''
        errorTxtPw = {errors.lenght && errors.join(' ')}
        onConfirmClick = {onConfirm}
        onCancelClick = {onCancel}
        />
        </>
        
    );
}

export default LoginPage;