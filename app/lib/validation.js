// lib/validation.js

// Simple regex-based validators
export const validateName = (name) => /^[A-Za-z]+$/.test(name)
export const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
export const validatePhone = (phone) => /^[0-9\s]+$/.test(phone)

// Pickup date must be today or later
export const validatePickupDate = (pickupDate, pickupTime) => {
    if (!pickupDate) return false
    const now = new Date()
    // Default pickupTime to "00:00" if empty
    const pickup = new Date(`${pickupDate}T${pickupTime || '00:00'}`)
    return pickup >= now
}


// Return date must be after pickup date
export const validateReturnDate = (pickupDate, pickupTime, returnDate, returnTime) => {
    if (!pickupDate || !returnDate || !returnTime) return false
    // Default pickupTime to "00:00" if empty
    const pickup = new Date(`${pickupDate}T${pickupTime || '00:00'}`)
    const ret = new Date(`${returnDate}T${returnTime}`)
    return ret > pickup
}


// Booking form validator
export const validateBookingForm = (formData) => {
    const errors = {}

    // First name
    if (!formData.firstName) {
        errors.firstName = 'First name is required'
    } else if (!validateName(formData.firstName)) {
        errors.firstName = 'First name must contain only letters'
    }

    // Last name
    if (!formData.lastName) {
        errors.lastName = 'Last name is required'
    } else if (!validateName(formData.lastName)) {
        errors.lastName = 'Last name must contain only letters'
    }

    // Email
    if (!formData.email) {
        errors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
        errors.email = 'Please enter a valid email address'
    }

    // Phone
    if (!formData.phoneNumber) {
        errors.phoneNumber = 'Phone number is required'
    } else if (!validatePhone(formData.phoneNumber)) {
        errors.phoneNumber = 'Phone number must contain only numbers and spaces'
    }

    // Pickup date & time
    const pickupErrors = []
    if (!formData.pickupDate) pickupErrors.push("Pick-up date is required")
    // if (!formData.pickupTime) pickupErrors.push("Pick-up time is required")
    else if (!validatePickupDate(formData.pickupDate, formData.pickupTime))
        pickupErrors.push("Pick-up must be today or later")
    if (pickupErrors.length > 0) errors.pickup = pickupErrors.join(", ")

    // Return date & time
    const returnErrors = []
    if (!formData.returnDate) returnErrors.push("Return date is required")
    if (!formData.returnTime) returnErrors.push("Return time is required")
    else if (!validateReturnDate(
        formData.pickupDate,
        formData.pickupTime,
        formData.returnDate,
        formData.returnTime
    )) returnErrors.push("Return date must be after pick-up date")
    if (returnErrors.length > 0) errors.return = returnErrors.join(", ")

    return errors
}

// Vehicle form validator
export const validateVehicleForm = (formData) => {
    const errors = {}

    // Only category and transmission are required
    if (!formData.category) {
        errors.category = 'Please select a vehicle category'
    }
    if (!formData.transmission) {
        errors.transmission = 'Please select transmission type'
    }

    // Optional: validate remarks length
    if (formData.remarks && formData.remarks.length > 500) {
        errors.remarks = 'Remarks must be 500 characters or less'
    }

    return errors
}
