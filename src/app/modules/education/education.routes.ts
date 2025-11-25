import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { EducationValidations } from './education.validation';
import { EducationControllers } from './education.controller';
import auth from '../../middlewares/auth';
import { UserRoleEnum } from '@prisma/client';

const router = Router();

router.post(
    '/',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    validateRequest.body(EducationValidations.createEducationValidationSchema),
    EducationControllers.createEducation
);

router.get('/', EducationControllers.getAllEducations);

router.get('/:id', EducationControllers.getEducationById);

router.patch(
    '/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    validateRequest.body(EducationValidations.updateEducationValidationSchema),
    EducationControllers.updateEducation
);

router.delete(
    '/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    EducationControllers.deleteEducation
);

export const EducationRoutes = router;
