import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ExperienceValidations } from './experience.validation';
import { ExperienceControllers } from './experience.controller';
import auth from '../../middlewares/auth';
import { UserRoleEnum } from '@prisma/client';

const router = Router();

router.post(
    '/',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    validateRequest.body(ExperienceValidations.createExperienceValidationSchema),
    ExperienceControllers.createExperience
);

router.get('/', ExperienceControllers.getAllExperiences);

router.get('/:id', ExperienceControllers.getExperienceById);

router.patch(
    '/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    validateRequest.body(ExperienceValidations.updateExperienceValidationSchema),
    ExperienceControllers.updateExperience
);

router.delete(
    '/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    ExperienceControllers.deleteExperience
);

export const ExperienceRoutes = router;
