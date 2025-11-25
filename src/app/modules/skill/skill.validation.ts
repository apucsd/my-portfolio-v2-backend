import { z } from 'zod';

const createSkillValidationSchema = z.object({
    body: z.object({
        backend: z.array(z.string()).default([]),
        frontend: z.array(z.string()).default([]),
        devOps: z.array(z.string()).default([]),
        database: z.array(z.string()).default([]),
        tools: z.array(z.string()).default([]),
        other: z.array(z.string()).default([]),
    }),
});

const updateSkillValidationSchema = z.object({
    body: z.object({
        backend: z.array(z.string()).optional(),
        frontend: z.array(z.string()).optional(),
        devOps: z.array(z.string()).optional(),
        database: z.array(z.string()).optional(),
        tools: z.array(z.string()).optional(),
        other: z.array(z.string()).optional(),
    }),
});

export const SkillValidations = {
    createSkillValidationSchema,
    updateSkillValidationSchema,
};
