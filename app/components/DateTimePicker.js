'use client'

import { useState, useEffect } from 'react'

export default function DateTimePicker({
                                           label = "Datum & Uhrzeit",
                                           dateValue = "",
                                           timeValue = "",
                                           onDateChange,
                                           onTimeChange,
                                           dateName,
                                           timeName,
                                           error,
                                           minDate
                                       }) {
    const [date, setDate] = useState(dateValue || "")
    const [hour, setHour] = useState(timeValue ? timeValue.split(":")[0] : "")
    const [minute, setMinute] = useState(timeValue ? timeValue.split(":")[1] : "")

    // Geschäftszeiten (anpassen)
    const businessHoursStart = 8
    const businessHoursEnd = 18

    const hours = []
    for (let h = businessHoursStart; h <= businessHoursEnd; h++) {
        hours.push(String(h).padStart(2, "0"))
    }
    const minutes = ["00", "15", "30", "45"]

    // Sync props changes
    useEffect(() => {
        setDate(dateValue || "")
        if (timeValue) {
            const [h, m] = timeValue.split(":")
            setHour(h)
            setMinute(m)
        } else {
            setHour("")
            setMinute("")
        }
    }, [dateValue, timeValue])

    const handleDateChange = (e) => {
        const newDate = e.target.value
        setDate(newDate)
        onDateChange && onDateChange({ target: { name: dateName, value: newDate } })
    }

    const handleTimeChange = (newHour, newMinute) => {
        setHour(newHour)
        setMinute(newMinute)
        if (onTimeChange) {
            const timeStr = newHour && newMinute ? `${newHour}:${newMinute}` : ""
            onTimeChange({ target: { name: timeName, value: timeStr } })
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
            <label>{label}</label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {/* Datum */}
                <input
                    type="date"
                    value={date}
                    min={minDate || new Date().toISOString().split("T")[0]} // disable past dates
                    onChange={handleDateChange}
                    style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        flex: "1"
                    }}
                />

                {/* Stunde */}
                <select
                    value={hour}
                    onChange={(e) => handleTimeChange(e.target.value, minute)}
                    style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
                >
                    <option value="" hidden>00</option>
                    {hours.map((h) => (
                        <option key={h} value={h}>{h}</option>
                    ))}
                </select>
                <p>:</p>
                {/* Minute */}
                <select
                    value={minute}
                    onChange={(e) => handleTimeChange(hour, e.target.value)}
                    style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
                >
                    <option value="" hidden>00</option>
                    {minutes.map((m) => (
                        <option key={m} value={m}>{m}</option>
                    ))}
                </select>
            </div>

            {error && <span style={{ color: "#e53e3e", fontSize: "12px" }}>{error}</span>}
        </div>
    )
}
