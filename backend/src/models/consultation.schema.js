const { z } = require('zod');

const consultationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number is required'),
  company: z.string().optional(),
  practiceArea: z.string().min(1, 'Practice Area is required'),
  subject: z.string().min(1, 'Subject is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  consultationMode: z.string().min(1, 'Consultation mode is required'),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional()
});

module.exports = { consultationSchema };
