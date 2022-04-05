import './Form.css';

const BaseButton = ({children, ...rest}) => {
    return(
        <button {...rest}>
            {children}
        </button>
    );
}

export const PrimaryButton = ({children, ...rest}) => {
    return (
        <BaseButton className='button_primary' {...rest}>
            {children}
        </BaseButton>
    );
}

export const SecondaryButton = ({className: customClassName, children, ...rest}) => {
    return (
        <BaseButton className={['button_secondary', customClassName].join(' ')} 
        {...rest}
        >
            {children}
        </BaseButton>
    );
}

export const Button = ({children, ...rest}) => {
    return (
        <BaseButton className="button" 
        {...rest}
        >
            {children}
        </BaseButton>
    );
}