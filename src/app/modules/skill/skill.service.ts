import httpStatus from 'http-status';
import { Skill } from '@prisma/client';
import QueryBuilder from '../../builder/QueryBuilder';
import { prisma } from '../../utils/prisma';
import AppError from '../../errors/AppError';

const createSkillIntoDB = async (payload: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.skill.create({
        data: payload,
    });
    return result;
};

const getAllSkillsFromDB = async (query: any) => {
    const skillQuery = new QueryBuilder<typeof prisma.skill>(prisma.skill, query);
    const result = await skillQuery.filter().sort().fields().paginate().execute();

    return result;
};

const getSkillByIdFromDB = async (id: string) => {
    const skill = await prisma.skill.findUnique({
        where: { id },
    });

    if (!skill) {
        throw new AppError(httpStatus.NOT_FOUND, 'Skill not found');
    }

    return skill;
};

const updateSkillIntoDB = async (id: string, payload: Partial<Skill>) => {
    const skill = await prisma.skill.findUnique({
        where: { id },
    });

    if (!skill) {
        throw new AppError(httpStatus.NOT_FOUND, 'Skill not found');
    }

    const result = await prisma.skill.update({
        where: { id },
        data: payload,
    });

    return result;
};

const deleteSkillFromDB = async (id: string) => {
    const skill = await prisma.skill.findUnique({
        where: { id },
    });

    if (!skill) {
        throw new AppError(httpStatus.NOT_FOUND, 'Skill not found');
    }

    const result = await prisma.skill.delete({
        where: { id },
    });

    return result;
};

export const SkillServices = {
    createSkillIntoDB,
    getAllSkillsFromDB,
    getSkillByIdFromDB,
    updateSkillIntoDB,
    deleteSkillFromDB,
};
