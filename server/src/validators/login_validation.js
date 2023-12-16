
const {z} = require("zod");
const LoginSchema = z.object({
    email: z
    .string({required_error: "Email is required "}) 
    .email({message: "Invalid email address"})
    .min(3, {message: "email must be at lest of 3 chars. "})
    .max(50, {message: "email must not be more than 50 characters"}),
    password: z
    .string({required_error: "Password is required"})
    .min(3, {message: "Password No must be at lest of 3 chars. "})
    .max(1024, {message: "Password No must not be more than 20 characters"}),
})
module.exports = LoginSchema;