const validatePhoneNumber = (phone: string) => /^\d{10}$/.test(phone)

export default validatePhoneNumber
