// app/vehicle/page.js
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PriceSlider from '../components/PriceSlider'
import Checkbox from '../components/Checkbox'
import Dropdown from '../components/Dropdown'
import { validateVehicleForm } from '../lib/validation'

export default function Vehicle() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        priceMin: 0,
        priceMax: 250,
        category: '',
        transmission: '',
        color: '',
        childSeat: false,
        additionalDriver: false,
        navigationSystem: false,
        roofBox: false,
        fullInsurance: false,
        topPriority: '',
        remarks: ''
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handlePriceChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newErrors = validateVehicleForm(formData)

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        const previousData = JSON.parse(sessionStorage.getItem('bookingData') || '{}')
        const completeBooking = { ...previousData, ...formData }
        sessionStorage.setItem('bookingData', JSON.stringify(completeBooking))

        router.push('/confirmation')
    }

    const categoryOptions = [
        { value: 'city', label: 'City' },
        { value: 'family', label: 'Family' },
        { value: 'suv', label: 'SUV' },
        { value: 'sport', label: 'Sport' },
        { value: 'ecar', label: 'E-Car' }
    ]

    const transmissionOptions = [
        { value: 'automatic', label: 'Automatic' },
        { value: 'manual', label: 'Manual' }
    ]

    const colorOptions = [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'black', label: 'Black' },
        { value: 'white', label: 'White' },
        { value: 'silver', label: 'Silver' }
    ]

    const priorityOptions = [
        { value: 'ecofriendly', label: 'Eco-friendly' },
        { value: 'sports', label: 'Sports car' },
        { value: 'luxurious', label: 'Luxurious' },
        { value: 'budget', label: 'Budget' }
    ]

    const labelStyle = {
        display: 'block',
        marginBottom: '10px',
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
                    Booking &gt; <span style={{ fontWeight: '600', color: '#6B46C1' }}>Vehicle and extras</span> &gt; Done
                </p>

                <h2 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    margin: '0 0 8px 0',
                    color: '#333'
                }}>Car and features</h2>

                <p style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '30px'
                }}>Choose your car and customize your experience with Car4You as you prefer</p>

                <form onSubmit={handleSubmit}>
                    <PriceSlider
                        minValue={formData.priceMin}
                        maxValue={formData.priceMax}
                        onMinChange={handlePriceChange}
                        onMaxChange={handlePriceChange}
                    />

                    <div style={{ marginBottom: '25px' }}>
                        <label style={labelStyle}>Car category *</label>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                            gap: '10px'
                        }}>
                            {categoryOptions.map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleChange({ target: { name: 'category', value: option.value }})}
                                    style={{
                                        padding: '12px',
                                        border: formData.category === option.value ? '2px solid #6B46C1' : '1px solid #ddd',
                                        borderRadius: '8px',
                                        background: formData.category === option.value ? '#f0e6ff' : 'white',
                                        color: formData.category === option.value ? '#6B46C1' : '#666',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: formData.category === option.value ? '600' : '400',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        {errors.category && <span style={errorStyle}>{errors.category}</span>}
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={labelStyle}>Car type *</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {transmissionOptions.map(option => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleChange({ target: { name: 'transmission', value: option.value }})}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        border: formData.transmission === option.value ? '2px solid #6B46C1' : '1px solid #ddd',
                                        borderRadius: '8px',
                                        background: formData.transmission === option.value ? '#6B46C1' : 'white',
                                        color: formData.transmission === option.value ? 'white' : '#666',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: formData.transmission === option.value ? '600' : '400',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        {errors.transmission && <span style={errorStyle}>{errors.transmission}</span>}
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={labelStyle}>Car color - optional</label>
                        <select
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '12px 15px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px',
                                outline: 'none',
                                background: 'white'
                            }}
                        >
                            <option value="">Select a color</option>
                            {colorOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={labelStyle}>Extra services - optional</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Checkbox
                                label="Child seat"
                                name="childSeat"
                                checked={formData.childSeat}
                                onChange={handleChange}
                            />
                            <Checkbox
                                label="Need a driver"
                                name="additionalDriver"
                                checked={formData.additionalDriver}
                                onChange={handleChange}
                            />
                            <Checkbox
                                label="Navigation system"
                                name="navigationSystem"
                                checked={formData.navigationSystem}
                                onChange={handleChange}
                            />
                            <Checkbox
                                label="Roof box"
                                name="roofBox"
                                checked={formData.roofBox}
                                onChange={handleChange}
                            />
                            <Checkbox
                                label="Fully covered insurance"
                                name="fullInsurance"
                                checked={formData.fullInsurance}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <Dropdown
                            label="Top priority"
                            name="topPriority"
                            options={priorityOptions}
                            value={formData.topPriority}
                            onChange={handleChange}
                            placeholder="Select priority"
                        />
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={labelStyle}>Remarks</label>
                        <textarea
                            name="remarks"
                            placeholder="Add any special requests or comments..."
                            value={formData.remarks}
                            onChange={handleChange}
                            maxLength="500"
                            style={{
                                width: '100%',
                                padding: '12px 15px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '14px',
                                outline: 'none',
                                minHeight: '100px',
                                resize: 'vertical',
                                fontFamily: 'inherit'
                            }}
                        />
                        <div style={{ fontSize: '12px', color: '#999', marginTop: '5px', textAlign: 'right' }}>
                            {formData.remarks.length}/500
                        </div>
                        {errors.remarks && <span style={errorStyle}>{errors.remarks}</span>}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                        <button type="button" onClick={() => router.push('/booking')} style={{
                            background: '#e0e0e0',
                            color: '#666',
                            border: 'none',
                            borderRadius: '50px',
                            padding: '14px',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            flex: 1,
                            transition: 'all 0.3s ease'
                        }}
                                onMouseOver={(e) => e.currentTarget.style.background = '#d0d0d0'}
                                onMouseOut={(e) => e.currentTarget.style.background = '#e0e0e0'}
                        >
                            Go back
                        </button>

                        <button type="submit" style={{
                            background: '#6B46C1',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50px',
                            padding: '14px',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            flex: 1,
                            transition: 'all 0.3s ease'
                        }}
                                onMouseOver={(e) => e.currentTarget.style.background = '#5a38a3'}
                                onMouseOut={(e) => e.currentTarget.style.background = '#6B46C1'}
                        >
                            Continue
                        </button>
                    </div>

                    <button type="button" onClick={() => router.push('/')} style={{
                        background: 'transparent',
                        color: '#999',
                        border: 'none',
                        padding: '14px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        width: '100%'
                    }}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}