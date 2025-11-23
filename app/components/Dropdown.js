// components/Dropdown.js
export default function Dropdown({
                                     label,
                                     name,
                                     options,
                                     value,
                                     onChange,
                                     placeholder = 'Select an option',
                                     required = false,
                                     error
                                 }) {
    return (
        <div>
            {label && <label htmlFor={name} style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#333'
            }}>{label}{required && ' *'}</label>}
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white',
                    cursor: 'pointer'
                }}
            >
                <option value="">{placeholder}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span style={{
                color: '#e53e3e',
                fontSize: '12px',
                marginTop: '5px',
                display: 'block'
            }}>{error}</span>}
        </div>
    )
}