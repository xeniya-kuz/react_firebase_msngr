import "./Input.sass"
export function Input({ placeholder, value, onChange, type, inputRef, className, currentPassword }) {

    return (
        <input className={`input ${className}`} value={value} type={type} ref={inputRef} onChange={onChange} placeholder={placeholder} autoComplete={currentPassword}></input>
    )
}