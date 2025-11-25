import httpStatus from 'http-status';
import { ContactForm, ContactLinks } from '@prisma/client';
import QueryBuilder from '../../builder/QueryBuilder';
import { prisma } from '../../utils/prisma';
import AppError from '../../errors/AppError';

// Contact Form Services
const createContactFormIntoDB = async (payload: Omit<ContactForm, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.contactForm.create({
        data: payload,
    });
    return result;
};

const getAllContactFormsFromDB = async (query: any) => {
    const contactFormQuery = new QueryBuilder<typeof prisma.contactForm>(prisma.contactForm, query);
    const result = await contactFormQuery.search(['name', 'email', 'subject']).filter().sort().fields().paginate().execute();

    return result;
};

const getContactFormByIdFromDB = async (id: string) => {
    const contactForm = await prisma.contactForm.findUnique({
        where: { id },
    });

    if (!contactForm) {
        throw new AppError(httpStatus.NOT_FOUND, 'Contact form not found');
    }

    return contactForm;
};

const deleteContactFormFromDB = async (id: string) => {
    const contactForm = await prisma.contactForm.findUnique({
        where: { id },
    });

    if (!contactForm) {
        throw new AppError(httpStatus.NOT_FOUND, 'Contact form not found');
    }

    const result = await prisma.contactForm.delete({
        where: { id },
    });

    return result;
};

// Contact Links Services
const createContactLinksIntoDB = async (payload: Omit<ContactLinks, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.contactLinks.create({
        data: payload,
    });
    return result;
};

const getAllContactLinksFromDB = async (query: any) => {
    const contactLinksQuery = new QueryBuilder<typeof prisma.contactLinks>(prisma.contactLinks, query);
    const result = await contactLinksQuery.filter().sort().fields().paginate().execute();

    return result;
};

const getContactLinksByIdFromDB = async (id: string) => {
    const contactLinks = await prisma.contactLinks.findUnique({
        where: { id },
    });

    if (!contactLinks) {
        throw new AppError(httpStatus.NOT_FOUND, 'Contact links not found');
    }

    return contactLinks;
};

const updateContactLinksIntoDB = async (id: string, payload: Partial<ContactLinks>) => {
    const contactLinks = await prisma.contactLinks.findUnique({
        where: { id },
    });

    if (!contactLinks) {
        throw new AppError(httpStatus.NOT_FOUND, 'Contact links not found');
    }

    const result = await prisma.contactLinks.update({
        where: { id },
        data: payload,
    });

    return result;
};

const deleteContactLinksFromDB = async (id: string) => {
    const contactLinks = await prisma.contactLinks.findUnique({
        where: { id },
    });

    if (!contactLinks) {
        throw new AppError(httpStatus.NOT_FOUND, 'Contact links not found');
    }

    const result = await prisma.contactLinks.delete({
        where: { id },
    });

    return result;
};

export const ContactServices = {
    createContactFormIntoDB,
    getAllContactFormsFromDB,
    getContactFormByIdFromDB,
    deleteContactFormFromDB,
    createContactLinksIntoDB,
    getAllContactLinksFromDB,
    getContactLinksByIdFromDB,
    updateContactLinksIntoDB,
    deleteContactLinksFromDB,
};
