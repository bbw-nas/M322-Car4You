// components/PriceSlider.js
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
        const value = parseInt(e.target.value)
        if (value <= maxValue) {
            onMinChange({ target: { name: 'priceMin', value } })
        }
    }

    const handleMaxSlider = (e) => {
        const value = parseInt(e.target.value)
        if (value >= minValue) {
            onMaxChange({ target: { name: 'priceMax', value } })
        }
    }

    const handleMinInput = (e) => {
        const value = e.target.value
        if (value === '' || /^\d+$/.test(value)) {
            const numValue = value === '' ? min : parseInt(value)
            if (numValue >= min && numValue <= maxValue) {
                onMinChange({ target: { name: 'priceMin', value: numValue } })
            }
        }
    }

    const handleMaxInput = (e) => {
        const value = e.target.value
        if (value === '' || /^\d+$/.test(value)) {
            const numValue = value === '' ? max : parseInt(value)
            if (numValue <= max && numValue >= minValue) {
                onMaxChange({ target: { name: 'priceMax', value: numValue } })
            }
        }
    }

    const minPercent = ((minValue - min) / (max - min)) * 100
    const maxPercent = ((maxValue - min) / (max - min)) * 100

    return (
        <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
                Daily price (€)
            </label>

            <div style={{ position: 'relative', height: '40px', marginBottom: '15px' }}>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '4px',
                    background: '#e0e0e0',
                    borderRadius: '2px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }} />

                <div style={{
                    position: 'absolute',
                    height: '4px',
                    background: '#6B46C1',
                    borderRadius: '2px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: `${minPercent}%`,
                    right: `${100 - maxPercent}%`
                }} />

                <input
                    type="range"
                    min={min}
                    max={max}
                    value={minValue}
                    onChange={handleMinSlider}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '4px',
                        background: 'transparent',
                        pointerEvents: 'none',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        WebkitAppearance: 'none',
                        appearance: 'none'
                    }}
                    onMouseDown={(e) => e.target.style.pointerEvents = 'auto'}
                    onMouseUp={(e) => e.target.style.pointerEvents = 'none'}
                />

                <input
                    type="range"
                    min={min}
                    max={max}
                    value={maxValue}
                    onChange={handleMaxSlider}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '4px',
                        background: 'transparent',
                        pointerEvents: 'none',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        WebkitAppearance: 'none',
                        appearance: 'none'
                    }}
                    onMouseDown={(e) => e.target.style.pointerEvents = 'auto'}
                    onMouseUp={(e) => e.target.style.pointerEvents = 'none'}
                />

                <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: #6B46C1;
            border: 3px solid white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            pointer-events: auto;
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #6B46C1;
            border: 3px solid white;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            pointer-events: auto;
          }
        `}</style>
            </div>

            <div style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <input
                    type="number"
                    value={minValue}
                    onChange={handleMinInput}
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
                    onChange={handleMaxInput}
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