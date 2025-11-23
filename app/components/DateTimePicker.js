// components/DateTimePicker.js
export default function DateTimePicker({
                                           label,
                                           dateValue,
                                           timeValue,
                                           onDateChange,
                                           onTimeChange,
                                           dateName,
                                           timeName,
                                           error,
                                           minDate
                                       }) {
    const today = new Date().toISOString().split('T')[0]

    return (
        <div>
            {label && <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#333'
            }}>{label}</label>}
            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="date"
                    name={dateName}
                    value={dateValue}
                    onChange={onDateChange}
                    min={minDate || today}
                    required
                    style={{
                        flex: 1,
                        padding: '12px 15px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                    }}
                />
                <input
                    type="time"
                    name={timeName}
                    value={timeValue}
                    onChange={onTimeChange}
                    required
                    style={{
                        width: '120px',
                        padding: '12px 15px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                    }}
                />
            </div>
            {error && <span style={{
                color: '#e53e3e',
                fontSize: '12px',
                marginTop: '5px',
                display: 'block'
            }}>{error}</span>}
        </div>
    )
}