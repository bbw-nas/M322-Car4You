// components/Checkbox.js
export default function Checkbox({
                                     label,
                                     name,
                                     checked,
                                     onChange
                                 }) {
    return (
        <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            padding: '8px 0'
        }}>
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#6B46C1'
                }}
            />
            <span style={{
                fontSize: '14px',
                color: '#333'
            }}>{label}</span>
        </label>
    )
}