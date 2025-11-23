'use client'

export default function PriceSlider({
                                        minValue,
                                        maxValue,
                                        onMinChange,
                                        onMaxChange,
                                        min = 0,
                                        max = 250
                                    }) {
    const handleMinSlider = (e) => {
        const value = Math.min(Number(e.target.value), maxValue - 1)
        onMinChange({ target: { name: 'priceMin', value } })
    }

    const handleMaxSlider = (e) => {
        const value = Math.max(Number(e.target.value), minValue + 1)
        onMaxChange({ target: { name: 'priceMax', value } })
    }

    const minPercent = ((minValue - min) / (max - min)) * 100
    const maxPercent = ((maxValue - min) / (max - min)) * 100

    return (
        <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
                Daily rate (CHF) - optional
            </label>

            <div style={{ position: 'relative', height: '40px', marginBottom: '25px' }}>

                {/* Left gray */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: 0,
                        height: '6px',
                        width: `${minPercent}%`,
                        backgroundColor: '#ccc',
                        borderRadius: '3px'
                    }}
                />

                {/* Purple middle */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: `${minPercent}%`,
                        height: '6px',
                        width: `${maxPercent - minPercent}%`,
                        backgroundColor: '#6B46C1',
                        borderRadius: '3px'
                    }}
                />

                {/* Right gray */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        left: `${maxPercent}%`,
                        height: '6px',
                        width: `${100 - maxPercent}%`,
                        backgroundColor: '#ccc',
                        borderRadius: '3px'
                    }}
                />

                {/* MIN slider */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minValue}
                    onChange={handleMinSlider}
                    className="slider"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 4,
                        pointerEvents: 'none' // <— IMPORTANT
                    }}
                />

                {/* MAX slider */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxValue}
                    onChange={handleMaxSlider}
                    className="slider"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 3,
                        pointerEvents: 'none' // <— IMPORTANT
                    }}
                />

                <style>{`
                    .slider {
                        -webkit-appearance: none;
                        appearance: none;
                        background: none;
                        height: 6px;
                    }

                    /* Thumbs now handle ALL pointer events */
                    .slider::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        pointer-events: auto;     /* <— MAGIC FIX */
                        width: 20px;
                        height: 20px;
                        background: #6B46C1;
                        border: 3px solid white;
                        border-radius: 50%;
                        cursor: pointer;
                        position: relative;
                    }

                    .slider::-moz-range-thumb {
                        pointer-events: auto;     /* <— MAGIC FIX */
                        width: 20px;
                        height: 20px;
                        background: #6B46C1;
                        border: 3px solid white;
                        border-radius: 50%;
                        cursor: pointer;
                    }

                    .slider::-webkit-slider-runnable-track {
                        background: transparent;
                    }
                    .slider::-moz-range-track {
                        background: transparent;
                    }
                `}</style>
            </div>

            {/* Number inputs */}
            <div style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <input
                    type="number"
                    value={minValue}
                    onChange={(e) =>
                        onMinChange({ target: { name: 'priceMin', value: Number(e.target.value) } })
                    }
                    min={min}
                    max={max}
                    style={{
                        width: '80px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}
                />

                <span style={{ fontSize: '1.2rem', color: '#666' }}>-</span>

                <input
                    type="number"
                    value={maxValue}
                    onChange={(e) =>
                        onMaxChange({ target: { name: 'priceMax', value: Number(e.target.value) } })
                    }
                    min={min}
                    max={max}
                    style={{
                        width: '80px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}
                />
            </div>
        </div>
    )
}
