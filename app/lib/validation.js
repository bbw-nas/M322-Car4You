// lib/validation.js

// Validates that input contains only letters and spaces
export const validateName = (value) => {
    if (!value) return false
    return /^[A-Za-zÀ-ÿ\s]+$/.test(value)
}

// Validates email format
export const validateEmail = (value) => {
    if (!value) return false
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
}

// Validates phone number (numbers and spaces only)
export const validatePhone = (value) => {
    if (!value) return false
    return /^[0-9\s]+$/.test(value)
}

// Validates that pickup date is today or later
export const validatePickupDate = (dateString, timeString) => {
    if (!dateString || !timeString) return false

    const pickupDateTime = new Date(`${dateString}T${timeString}`)
    const now = new Date()

    return pickupDateTime >= now
}

// Validates that return date is after pickup date
export const validateReturnDate = (pickupDate, pickupTime, returnDate, returnTime) => {
    if (!pickupDate || !pickupTime || !returnDate || !returnTime) return false

    const pickupDateTime = new Date(`${pickupDate}T${pickupTime}`)
    const returnDateTime = new Date(`${returnDate}T${returnTime}`)

    return returnDateTime > pickupDateTime
}

// Validates text length
export const validateTextLength = (value, maxLength) => {
    if (!value) return true
    return value.length <= maxLength
}

// Validates price range
export const validatePriceRange = (min, max, minAllowed = 0, maxAllowed = 250) => {
    if (typeof min !== 'number' || typeof max !== 'number') return false
    if (min < minAllowed || max > maxAllowed) return false
    return min <= max
}

// Validates that a value is selected from required field
export const validateRequired = (value) => {
    if (typeof value === 'string') return value.trim() !== ''
    if (typeof value === 'boolean') return true
    return value !== null && value !== undefined
}

// Main validation function for booking form
export const validateBookingForm = (formData) => {
    const errors = {}

    if (!validateName(formData.firstName)) {
        errors.firstName = 'First name must contain only letters'
    }

    if (!validateName(formData.lastName)) {
        errors.lastName = 'Last name must contain only letters'
    }

    if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address'
    }

    if (!validatePhone(formData.phoneNumber)) {
        errors.phoneNumber = 'Phone number must contain only numbers and spaces'
    }

    if (!validatePickupDate(formData.pickupDate, formData.pickupTime)) {
        errors.pickup = 'Pick-up date must be today or later'
    }

    if (!validateReturnDate(
        formData.pickupDate,
        formData.pickupTime,
        formData.returnDate,
        formData.returnTime
    )) {
        errors.return = 'Return date must be after pick-up date'
    }

    return errors
}

// Main validation function for vehicle form
export const validateVehicleForm = (formData) => {
    const errors = {}

    if (!validateRequired(formData.category)) {
        errors.category = 'Please select a vehicle category'
    }

    if (!validateRequired(formData.transmission)) {
        errors.transmission = 'Please select transmission type'
    }

    if (!validatePriceRange(formData.priceMin, formData.priceMax)) {
        errors.priceRange = 'Invalid price range'
    }

    if (!validateTextLength(formData.remarks, 500)) {
        errors.remarks = 'Remarks must be 500 characters or less'
    }

    return errors
}