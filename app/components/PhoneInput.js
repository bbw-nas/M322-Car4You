// components/PhoneInput.js
import { countryCodes } from '../utils/countryCodes'

export default function PhoneInput({
                                       countryCode,
                                       phoneNumber,
                                       onCountryChange,
                                       onPhoneChange,
                                       error
                                   }) {
    return (
        <div>
            <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#333'
            }}>Phone number</label>
            <div style={{ display: 'flex', gap: '10px' }}>
                <select
                    name="phoneCountry"
                    value={countryCode}
                    onChange={onCountryChange}
                    style={{
                        width: '120px',
                        padding: '12px 10px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        background: 'white'
                    }}
                >
                    {countryCodes.map(country => (
                        <option key={country.code} value={country.code}>
                            {country.code}
                        </option>
                    ))}
                </select>
                <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="000 000 000"
                    value={phoneNumber}
                    onChange={onPhoneChange}
                    style={{
                        flex: 1,
                        padding: '12px 15px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none'
                    }}
                    required
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