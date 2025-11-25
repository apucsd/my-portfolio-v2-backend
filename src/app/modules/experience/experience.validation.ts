import { z } from 'zod';

const createExperienceValidationSchema = z.object({
    body: z.object({
        companyName: z.string({ required_error: 'Company name is required' }),
        location: z.string({ required_error: 'Location is required' }),
        position: z.string({ required_error: 'Position is required' }),
        startDate: z.string({ required_error: 'Start date is required' }).transform((str) => new Date(str)),
        endDate: z
            .string()
            .optional()
            .transform((str) => (str ? new Date(str) : undefined)),
        works: z.array(z.string()).min(1, 'At least one work description is required'),
        techs: z.array(z.string()).min(1, 'At least one technology is required'),
    }),
});

const updateExperienceValidationSchema = z.object({
    body: z.object({
        companyName: z.string().optional(),
        location: z.string().optional(),
        position: z.string().optional(),
        startDate: z
            .string()
            .optional()
            .transform((str) => (str ? new Date(str) : undefined)),
        endDate: z
            .string()
            .optional()
            .transform((str) => (str ? new Date(str) : undefined)),
        works: z.array(z.string()).optional(),
        techs: z.array(z.string()).optional(),
    }),
});

export const ExperienceValidations = {
    createExperienceValidationSchema,
    updateExperienceValidationSchema,
};
