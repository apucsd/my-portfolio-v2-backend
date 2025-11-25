import { z } from 'zod';

const createEducationValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }),
        institution: z.string({ required_error: 'Institution is required' }),
        passingYear: z.string({ required_error: 'Passing year is required' }),
        description: z.string().optional(),
    }),
});

const updateEducationValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        institution: z.string().optional(),
        passingYear: z.string().optional(),
        description: z.string().optional(),
    }),
});

export const EducationValidations = {
    createEducationValidationSchema,
    updateEducationValidationSchema,
};
