
interface InputErrorProps {
    isShow?: boolean,
    message?: string | null,
}

const InputError: React.FC<InputErrorProps> = ({
    isShow,
    message
}) => {

    if(!isShow) {
        return null;
    }

    return (
        <p className="text-sm text-red-500">
            {message ? message : 'This field is required'}
        </p>
    )
}

export default InputError;