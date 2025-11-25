import { z } from 'zod';

const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string({ required_error: 'Title is required' }),
        institution: z.string({ required_error: 'Institution is required' }),
        year: z.number({ required_error: 'Year is required' }).int().min(1900).max(2100),
        description: z.string().optional(),
        certificate: z.string().optional(),
    }),
});

const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        institution: z.string().optional(),
        year: z.number().int().min(1900).max(2100).optional(),
        description: z.string().optional(),
        certificate: z.string().optional(),
    }),
});

export const CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
};
