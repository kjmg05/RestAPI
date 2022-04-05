import SignIn from "./Signin";
import { useState } from "react";
import { publicAxios } from "../../../Lib/apiClient";

const SigninPage = () => {
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
            const data = await publicAxios.post('/api/v1/seguridad/signin', {email: txtCorreo, password: txtPw});
            console.log('signin' , data);
        } catch (ex) {
            console.log('Error', ex);
        }
        
    }

    const onCancel = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    return (
        <SignIn
        txtCorrreoValue = {txtCorreo}
        txtPasswordValue = {txtPw}
        onChange = {onChangeHandler}
        errorTxtCorreo = ''
        errorTxtPw = ''
        onConfirmClick = {onConfirm}
        onCancelClick = {onCancel}
        />
    );
}

export default SigninPage;