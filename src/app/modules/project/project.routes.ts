import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProjectValidations } from './project.validation';
import { ProjectControllers } from './project.controller';
import auth from '../../middlewares/auth';
import { UserRoleEnum } from '@prisma/client';
import { upload } from '../../utils/fileUploader';

const router = Router();

router.post(
    '/',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    validateRequest.body(ProjectValidations.createProjectValidationSchema),
    ProjectControllers.createProject
);

router.get('/', ProjectControllers.getAllProjects);

router.get('/:id', ProjectControllers.getProjectById);

router.patch(
    '/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    validateRequest.body(ProjectValidations.updateProjectValidationSchema),
    ProjectControllers.updateProject
);

router.put(
    '/image/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    upload.single('image'),
    ProjectControllers.updateProjectImage
);

router.delete(
    '/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    ProjectControllers.deleteProject
);

export const ProjectRoutes = router;
