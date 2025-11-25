import express from 'express';
import { AuthRouters } from '../modules/auth/auth.routes';
import { UserRouters } from '../modules/user/user.routes';
import { EducationRoutes } from '../modules/education/education.routes';
import { ProjectRoutes } from '../modules/project/project.routes';
import { ExperienceRoutes } from '../modules/experience/experience.routes';
import { SkillRoutes } from '../modules/skill/skill.routes';
import { CourseRoutes } from '../modules/course/course.routes';
import { ContactRoutes } from '../modules/contact/contact.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRouters,
    },
    {
        path: '/users',
        route: UserRouters,
    },
    {
        path: '/education',
        route: EducationRoutes,
    },
    {
        path: '/projects',
        route: ProjectRoutes,
    },
    {
        path: '/experience',
        route: ExperienceRoutes,
    },
    {
        path: '/skills',
        route: SkillRoutes,
    },
    {
        path: '/courses',
        route: CourseRoutes,
    },
    {
        path: '/contact',
        route: ContactRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
