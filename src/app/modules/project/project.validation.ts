import { z } from 'zod';

const createProjectValidationSchema = z.object({
    body: z.object({
        title: z.string({ required_error: 'Title is required' }),
        description: z.string({ required_error: 'Description is required' }),
        image: z.string().optional(),
        link: z.string().url().optional(),
        techs: z.array(z.string()).min(1, 'At least one technology is required'),
        repoLink: z.string().optional(),
    }),
});

const updateProjectValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        link: z.string().url().optional(),
        techs: z.array(z.string()).optional(),
        repoLink: z.string().optional(),
    }),
});

export const ProjectValidations = {
    createProjectValidationSchema,
    updateProjectValidationSchema,
};
