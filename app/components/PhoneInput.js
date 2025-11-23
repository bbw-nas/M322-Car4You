// components/PhoneInput.js
import { countryCodes } from '../utils/countryCodes'

// Function to convert country code to emoji flag
function flagEmoji(countryCode) {
    if (!countryCode) return "🏳️"
    return countryCode
        .replace(/[^A-Z]/g, "")
        .replace(/./g, char =>
            String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
}

export default function PhoneInput({
                                       countryCode,
                                       phoneNumber,
                                       onCountryChange,
                                       onPhoneChange,
                                       error
                                   }) {
    return (
        <div>
            <label
                style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#333'
                }}
            >
                Phone number
            </label>

            <div style={{ display: 'flex', gap: '10px' }}>
                {/* Country Selector */}
                <select
                    name="phoneCountry"
                    value={countryCode}
                    onChange={onCountryChange}
                    style={{
                        width: '220px',
                        padding: '12px 10px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        background: 'white'
                    }}
                >
                    {countryCodes.map((country, index) => (
                        <option key={index} value={country.code}>
                            {flagEmoji(country.alpha2 || "")} {country.country} ({country.code})
                        </option>
                    ))}
                </select>

                {/* Phone number input */}
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

            {error && (
                <span
                    style={{
                        color: '#e53e3e',
                        fontSize: '12px',
                        marginTop: '5px',
                        display: 'block'
                    }}
                >
                    {error}
                </span>
            )}
        </div>
    )
}
