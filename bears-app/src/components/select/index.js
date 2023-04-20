function Select({label, options, htmlFor}) {


    const Label = ({label}) => {
        return (
            <label className="usa-label" htmlFor={htmlFor}>{label}</label>
        )
    }
    
    const Options = ({options}) => {
        return (
            options.map((option) => {
            return (
                <option value={option.value} key={option.value}>{option.label}</option>
            )
        })
        )
    }

    return (
        <>
        <Label label={label} />
        <select className="usa-select" name={htmlFor} id={htmlFor}>
            <Options options={options} />
        </select>
        </>
    )
}

export default Select