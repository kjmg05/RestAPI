import { PrimaryButton, SecondaryButton } from '../../UX/Forms/Button';
import Input from '../../UX/Forms/Input';
import Page from '../../UX/Page/Page';

const SignIn = ({txtCorrreoValue, txtPasswordValue, onChange: onChangeHandler, errorTxtCorreo, errorTxtPw, onConfirmClick, onCancelClick}) => {
    return(
        <Page header={(<h2>Crear Cuente</h2>)}>
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
                    label = "Correo Electronico"
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
                    Crear Cuenta
                </PrimaryButton>
                <SecondaryButton onClick={onCancelClick}>
                    Tengo Cuenta
                </SecondaryButton>
            </section>
        </Page>
    );
}

export default SignIn;