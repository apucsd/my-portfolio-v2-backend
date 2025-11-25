import httpStatus from 'http-status';
import { Experience } from '@prisma/client';
import QueryBuilder from '../../builder/QueryBuilder';
import { prisma } from '../../utils/prisma';
import AppError from '../../errors/AppError';

const createExperienceIntoDB = async (payload: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.experience.create({
        data: payload,
    });
    return result;
};

const getAllExperiencesFromDB = async (query: any) => {
    const experienceQuery = new QueryBuilder<typeof prisma.experience>(prisma.experience, query);
    const result = await experienceQuery
        .search(['companyName', 'position', 'location'])
        .filter()
        .sort()
        .fields()
        .paginate()
        .execute();

    return result;
};

const getExperienceByIdFromDB = async (id: string) => {
    const experience = await prisma.experience.findUnique({
        where: { id },
    });

    if (!experience) {
        throw new AppError(httpStatus.NOT_FOUND, 'Experience not found');
    }

    return experience;
};

const updateExperienceIntoDB = async (id: string, payload: Partial<Experience>) => {
    const experience = await prisma.experience.findUnique({
        where: { id },
    });

    if (!experience) {
        throw new AppError(httpStatus.NOT_FOUND, 'Experience not found');
    }

    const result = await prisma.experience.update({
        where: { id },
        data: payload,
    });

    return result;
};

const deleteExperienceFromDB = async (id: string) => {
    const experience = await prisma.experience.findUnique({
        where: { id },
    });

    if (!experience) {
        throw new AppError(httpStatus.NOT_FOUND, 'Experience not found');
    }

    const result = await prisma.experience.delete({
        where: { id },
    });

    return result;
};

export const ExperienceServices = {
    createExperienceIntoDB,
    getAllExperiencesFromDB,
    getExperienceByIdFromDB,
    updateExperienceIntoDB,
    deleteExperienceFromDB,
};
