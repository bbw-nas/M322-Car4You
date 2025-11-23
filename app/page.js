// app/page.js
'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)'
        }}>
            <div style={{
                maxWidth: '400px',
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
                    padding: '12px 40px',
                    display: 'inline-block',
                    marginBottom: '40px'
                }}>
                    <h1 style={{
                        fontSize: '28px',
                        color: '#6B46C1',
                        margin: 0,
                        fontWeight: '600',
                        letterSpacing: '2px'
                    }}>CAR4YOU</h1>
                </div>

                <div style={{
                    width: '250px',
                    height: '150px',
                    background: '#f0f0f0',
                    borderRadius: '15px',
                    margin: '0 auto 30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999'
                }}>
                    [Car Image]
                </div>

                <h2 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    margin: '0 0 10px 0',
                    color: '#333'
                }}>NEED A CAR?</h2>

                <p style={{
                    fontSize: '16px',
                    margin: '0 0 40px 0',
                    color: '#666'
                }}>
                    WE GOT THE PERFECT CAR FOR <span style={{ color: '#6B46C1', fontWeight: '600' }}>YOU</span>
                </p>

                <button
                    onClick={() => router.push('/booking')}
                    style={{
                        background: '#6B46C1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '15px 50px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'background 0.3s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#5a38a3'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#6B46C1'}
                >
                    BOOK NOW
                </button>
            </div>
        </div>
    )
}