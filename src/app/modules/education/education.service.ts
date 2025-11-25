import httpStatus from 'http-status';
import { Education } from '@prisma/client';
import QueryBuilder from '../../builder/QueryBuilder';
import { prisma } from '../../utils/prisma';
import AppError from '../../errors/AppError';

const createEducationIntoDB = async (payload: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.education.create({
        data: payload,
    });
    return result;
};

const getAllEducationsFromDB = async (query: any) => {
    const educationQuery = new QueryBuilder<typeof prisma.education>(prisma.education, query);
    const result = await educationQuery.search(['name', 'institution']).filter().sort().fields().paginate().execute();

    return result;
};

const getEducationByIdFromDB = async (id: string) => {
    const education = await prisma.education.findUnique({
        where: { id },
    });

    if (!education) {
        throw new AppError(httpStatus.NOT_FOUND, 'Education not found');
    }

    return education;
};

const updateEducationIntoDB = async (id: string, payload: Partial<Education>) => {
    const education = await prisma.education.findUnique({
        where: { id },
    });

    if (!education) {
        throw new AppError(httpStatus.NOT_FOUND, 'Education not found');
    }

    const result = await prisma.education.update({
        where: { id },
        data: payload,
    });

    return result;
};

const deleteEducationFromDB = async (id: string) => {
    const education = await prisma.education.findUnique({
        where: { id },
    });

    if (!education) {
        throw new AppError(httpStatus.NOT_FOUND, 'Education not found');
    }

    const result = await prisma.education.delete({
        where: { id },
    });

    return result;
};

export const EducationServices = {
    createEducationIntoDB,
    getAllEducationsFromDB,
    getEducationByIdFromDB,
    updateEducationIntoDB,
    deleteEducationFromDB,
};
