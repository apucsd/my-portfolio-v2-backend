import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';
import auth from '../../middlewares/auth';
import { UserRoleEnum } from '@prisma/client';
import { upload } from '../../utils/fileUploader';

const router = Router();

router.post(
    '/',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    validateRequest.body(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourse
);

router.get('/', CourseControllers.getAllCourses);

router.get('/:id', CourseControllers.getCourseById);

router.patch(
    '/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    validateRequest.body(CourseValidations.updateCourseValidationSchema),
    CourseControllers.updateCourse
);

router.put(
    '/certificate/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    upload.single('certificate'),
    CourseControllers.updateCourseCertificate
);

router.delete(
    '/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    CourseControllers.deleteCourse
);

export const CourseRoutes = router;
