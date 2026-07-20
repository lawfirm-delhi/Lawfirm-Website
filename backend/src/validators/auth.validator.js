const { z } = require('zod');

const signupSchema = z.object({
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

const validateSignup = (data) => {
  const result = signupSchema.safeParse(data);
  if (!result.success) {
    return { error: { details: result.error.errors } };
  }
  return { value: result.data };
};

const validateLogin = (data) => {
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return { error: { details: result.error.errors } };
  }
  return { value: result.data };
};

module.exports = {
  validateSignup,
  validateLogin
};
