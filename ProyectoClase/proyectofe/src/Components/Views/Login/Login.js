import { PrimaryButton, SecondaryButton } from '../../UX/Forms/Button';
import Input from '../../UX/Forms/Input';
import Page from '../../UX/Page/Page';


const LogIn = ({txtCorrreoValue, txtPasswordValue, onChange: onChangeHandler, errorTxtCorreo, errorTxtPw, onConfirmClick, onCancelClick}) => {
    return(
        <Page header={(<h2>Iniciar Sesion</h2>)}>
            <section>
                <Input
                    label = "Correo Electronico"
                    type = "text"
                    name = "txtCorreo"
                    placeholder = "Correo Electronico"
                    value = {txtCorrreoValue}
                    error = {errorTxtCorreo}
                    hasError = ""
                    info = ""
                    onChange={onChangeHandler}
                />
                <Input
                    label = "Contraseña"
                    type = "password"
                    name = "txtPassword"
                    placeholder = "Contraseña"
                    value = {txtPasswordValue}
                    hasError = ""
                    error = {errorTxtPw}
                    info = "Informacion"
                    onChange={onChangeHandler}
                />
                <PrimaryButton onClick={onConfirmClick}>
                    Iniciar Sesion
                </PrimaryButton>
                <SecondaryButton onClick={onCancelClick}>
                    Crear Cuenta
                </SecondaryButton>
            </section>
        </Page>
    );
}

export default LogIn;