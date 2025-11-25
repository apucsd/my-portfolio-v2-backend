import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ContactValidations } from './contact.validation';
import { ContactControllers } from './contact.controller';
import auth from '../../middlewares/auth';
import { UserRoleEnum } from '@prisma/client';

const router = Router();

// Contact Form Routes
router.post(
    '/form',
    validateRequest.body(ContactValidations.createContactFormValidationSchema),
    ContactControllers.createContactForm
);

router.get(
    '/form',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    ContactControllers.getAllContactForms
);

router.get(
    '/form/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    ContactControllers.getContactFormById
);

router.delete(
    '/form/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    ContactControllers.deleteContactForm
);

// Contact Links Routes
router.post(
    '/links',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    validateRequest.body(ContactValidations.createContactLinksValidationSchema),
    ContactControllers.createContactLinks
);

router.get('/links', ContactControllers.getAllContactLinks);

router.get('/links/:id', ContactControllers.getContactLinksById);

router.patch(
    '/links/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    validateRequest.body(ContactValidations.updateContactLinksValidationSchema),
    ContactControllers.updateContactLinks
);

router.delete(
    '/links/:id',
    auth(UserRoleEnum.USER, UserRoleEnum.BUSINESS, UserRoleEnum.SUPERADMIN),
    ContactControllers.deleteContactLinks
);

export const ContactRoutes = router;
