const { z } = require('zod');


const signupSchema = z.object({
    firstName: z
    .string({required_error: "Name is required"})
    .trim()
    .min(3, {message: "Name must be at lest of 3 chars. "})
    .max(20, {message: "Name must not be more than 20 characters"}),
    email: z
    .string({required_error: "Email is required "}) 
    .email({message: "Invalid email address"})
    .min(3, {message: "email must be at lest of 3 chars. "})
    .max(50, {message: "email must not be more than 50 characters"}),
    phoneNo: z
    .string({required_error: "phone No is required"})
    .trim()
    .min(3, {message: "phone No must be at lest of 3 chars. "})
    .max(10, {message: "phone No must not be more than 10 characters"}),
    password: z
    .string({required_error: "Password is required"})
    .min(3, {message: "Password No must be at lest of 3 chars. "})
    .max(1024, {message: "Password No must not be more than 20 characters"}),
    
})
module.exports = signupSchema;