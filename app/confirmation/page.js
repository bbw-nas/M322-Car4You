// app/confirmation/page.js
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Confirmation() {
    const router = useRouter()
    const [bookingData, setBookingData] = useState(null)

    useEffect(() => {
        const data = sessionStorage.getItem('bookingData')
        if (data) {
            setBookingData(JSON.parse(data))
        } else {
            router.push('/')
        }
    }, [router])

    const handleNewBooking = () => {
        sessionStorage.removeItem('bookingData')
        router.push('/')
    }

    if (!bookingData) return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)'
        }}>
            <p>Loading...</p>
        </div>
    )

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                maxWidth: '500px',
                width: '100%',
                background: 'white',
                borderRadius: '20px',
                padding: '40px 30px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                textAlign: 'center'
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
                    marginBottom: '35px'
                }}>
                    Booking &gt; Choose your car &gt; <span style={{ fontWeight: '600', color: '#6B46C1' }}>Done</span>
                </p>

                <h2 style={{
                    fontSize: '26px',
                    fontWeight: '600',
                    margin: '0 0 15px 0',
                    color: '#333'
                }}>You are done!</h2>

                <p style={{
                    fontSize: '15px',
                    color: '#666',
                    marginBottom: '10px'
                }}>Your booking was successful</p>

                <p style={{
                    fontSize: '15px',
                    color: '#666',
                    marginBottom: '40px'
                }}>Check your mailbox for confirmation</p>


                <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    margin: '0 0 8px 0',
                    color: '#333'
                }}>Enjoy your ride</h3>

                <p style={{
                    fontSize: '14px',
                    color: '#666',
                    marginBottom: '40px'
                }}>Your car is patiently waiting to meet you!</p>

                <button
                    onClick={handleNewBooking}
                    style={{
                        background: '#6B46C1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '15px 40px',
                        fontSize: '15px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#5a38a3'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#6B46C1'}
                >
                    Make Another Booking
                </button>
            </div>
        </div>
    )
}