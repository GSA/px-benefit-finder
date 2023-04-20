function Button ({children, onClick}) {
    return (
        <button onClick={onClick} className="usa-button">{children}</button>
    )
}

export default Button