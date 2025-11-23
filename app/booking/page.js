// app/booking/page.js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PhoneInput from '../components/PhoneInput'
import DateTimePicker from '../components/DateTimePicker'
import { validateBookingForm } from '../lib/validation'
import { countryCodes } from '../utils/countryCodes'


const countryOptions = countryCodes.map(c => ({
    value: c.code,
    label: `${c.country} (${c.code})`
}))



export default function Booking() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneCountry: '+1',
        phoneNumber: '',
        pickupDate: '',
        pickupTime: '',
        returnDate: '',
        returnTime: ''
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitting...")
        const newErrors = validateBookingForm(formData)

        console.log("Errors:", newErrors)
// inside handleSubmit

// instead of: if (Object.keys(newErrors).length > 0) { ... }
// you can also force errors to always include every field
        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return


        sessionStorage.setItem('bookingData', JSON.stringify(formData))
        router.push('/vehicle')
    }

    const inputStyle = {
        width: '100%',
        padding: '12px 15px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        transition: 'border 0.3s ease'
    }

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontSize: '14px',
        fontWeight: '500',
        color: '#333'
    }

    const errorStyle = {
        color: '#e53e3e',
        fontSize: '12px',
        marginTop: '5px',
        display: 'block'
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
            padding: '20px'
        }}>
            <div style={{
                maxWidth: '500px',
                margin: '0 auto',
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    border: '3px solid #6B46C1',
                    borderRadius: '50px',
                    padding: '8px 30px',
                    display: 'inline-block',
                    marginBottom: '20px'
                }}>
                    <h1 style={{
                        fontSize: '24px',
                        color: '#6B46C1',
                        margin: 0,
                        fontWeight: '600'
                    }}>CAR4YOU</h1>
                </div>

                <p style={{
                    fontSize: '13px',
                    color: '#999',
                    marginBottom: '25px'
                }}>
                    <span style={{ fontWeight: '600', color: '#6B46C1' }}>Booking</span> &gt; Choose your car &gt; Done
                </p>

                <h2 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    margin: '0 0 8px 0',
                    color: '#333'
                }}>Booking</h2>

                <p style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '30px'
                }}>Personal information and duration</p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>First name</label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        />
                        {errors.firstName && <span style={errorStyle}>{errors.firstName}</span>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Last name</label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        />
                        {errors.lastName && <span style={errorStyle}>{errors.lastName}</span>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>E-mail</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@mail.com"
                            value={formData.email}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        />
                        {errors.email && <span style={errorStyle}>{errors.email}</span>}
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <PhoneInput
                                countryCode={formData.phoneCountry}
                                phoneNumber={formData.phoneNumber}
                                onCountryChange={handleChange}
                                onPhoneChange={handleChange}
                                options={countryOptions}
                                error={errors.phoneNumber}
                            />
                        </div>


                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <DateTimePicker
                            label="From"
                            dateValue={formData.pickupDate}
                            timeValue={formData.pickupTime}
                            onDateChange={handleChange}
                            onTimeChange={handleChange}
                            dateName="pickupDate"
                            timeName="pickupTime"
                            error={errors.pickup}
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <DateTimePicker
                            label="To"
                            dateValue={formData.returnDate}
                            timeValue={formData.returnTime}
                            onDateChange={handleChange}
                            onTimeChange={handleChange}
                            dateName="returnDate"
                            timeName="returnTime"
                            error={errors.return}
                            minDate={formData.pickupDate}
                        />
                    </div>

                    <button type="submit" style={{
                        background: '#6B46C1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '14px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        width: '100%',
                        marginBottom: '12px',
                        transition: 'all 0.3s ease'
                    }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#5a38a3'}
                            onMouseOut={(e) => e.currentTarget.style.background = '#6B46C1'}
                    >
                        Continue
                    </button>

                    <button type="button" onClick={() => router.push('/')} style={{
                        background: '#e0e0e0',
                        color: '#666',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '14px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'all 0.3s ease'
                    }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#d0d0d0'}
                            onMouseOut={(e) => e.currentTarget.style.background = '#e0e0e0'}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}