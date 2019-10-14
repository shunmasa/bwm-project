const minLength = min => value =>
value && value.length < min ? `Must be ${min} characters or more` : undefined

//check 4 chearchers
export const minLength4 = minLength(4)
export const required = (value) =>(value ? undefined : 'This input is required')