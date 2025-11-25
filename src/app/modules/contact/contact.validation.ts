import { z } from 'zod';

const createContactFormValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }),
        email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
        subject: z.string({ required_error: 'Subject is required' }),
        message: z.string({ required_error: 'Message is required' }),
    }),
});

const createContactLinksValidationSchema = z.object({
    body: z.object({
        github: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        facebook: z.string().url().optional(),
        phone: z.string().optional(),
        email: z.string().email().optional(),
        address: z.string().optional(),
        resume: z.string().url().optional(),
    }),
});

const updateContactLinksValidationSchema = z.object({
    body: z.object({
        github: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        facebook: z.string().url().optional(),
        phone: z.string().optional(),
        email: z.string().email().optional(),
        address: z.string().optional(),
        resume: z.string().url().optional(),
    }),
});

export const ContactValidations = {
    createContactFormValidationSchema,
    createContactLinksValidationSchema,
    updateContactLinksValidationSchema,
};
