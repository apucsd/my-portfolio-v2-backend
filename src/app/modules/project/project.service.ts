import httpStatus from 'http-status';
import { Project } from '@prisma/client';
import QueryBuilder from '../../builder/QueryBuilder';
import { prisma } from '../../utils/prisma';
import AppError from '../../errors/AppError';
import { uploadToDigitalOceanAWS } from '../../utils/uploadToDigitalOceanAWS';

const createProjectIntoDB = async (payload: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.project.create({
        data: payload,
    });
    return result;
};

const getAllProjectsFromDB = async (query: any) => {
    const projectQuery = new QueryBuilder<typeof prisma.project>(prisma.project, query);
    const result = await projectQuery.search(['title', 'description']).filter().sort().fields().paginate().execute();

    return result;
};

const getProjectByIdFromDB = async (id: string) => {
    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) {
        throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
    }

    return project;
};

const updateProjectIntoDB = async (id: string, payload: Partial<Project>) => {
    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) {
        throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
    }

    const result = await prisma.project.update({
        where: { id },
        data: payload,
    });

    return result;
};

const updateProjectImageIntoDB = async (id: string, file: Express.Multer.File | undefined) => {
    if (!file || file.fieldname !== 'image') {
        throw new AppError(httpStatus.BAD_REQUEST, 'Please provide image');
    }

    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) {
        throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
    }

    const { Location } = await uploadToDigitalOceanAWS(file);
    const result = await prisma.project.update({
        where: { id },
        data: {
            image: Location,
        },
    });

    return result;
};

const deleteProjectFromDB = async (id: string) => {
    const project = await prisma.project.findUnique({
        where: { id },
    });

    if (!project) {
        throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
    }

    const result = await prisma.project.delete({
        where: { id },
    });

    return result;
};

export const ProjectServices = {
    createProjectIntoDB,
    getAllProjectsFromDB,
    getProjectByIdFromDB,
    updateProjectIntoDB,
    updateProjectImageIntoDB,
    deleteProjectFromDB,
};
