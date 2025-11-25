import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SkillValidations } from './skill.validation';
import { SkillControllers } from './skill.controller';
import auth from '../../middlewares/auth';
import { UserRoleEnum } from '@prisma/client';

const router = Router();

router.post(
    '/',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    validateRequest.body(SkillValidations.createSkillValidationSchema),
    SkillControllers.createSkill
);

router.get('/', SkillControllers.getAllSkills);

router.get('/:id', SkillControllers.getSkillById);

router.patch(
    '/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    validateRequest.body(SkillValidations.updateSkillValidationSchema),
    SkillControllers.updateSkill
);

router.delete(
    '/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    SkillControllers.deleteSkill
);

export const SkillRoutes = router;
