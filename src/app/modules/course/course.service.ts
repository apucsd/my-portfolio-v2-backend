import httpStatus from 'http-status';
import { Course } from '@prisma/client';
import QueryBuilder from '../../builder/QueryBuilder';
import { prisma } from '../../utils/prisma';
import AppError from '../../errors/AppError';
import { uploadToDigitalOceanAWS } from '../../utils/uploadToDigitalOceanAWS';

const createCourseIntoDB = async (payload: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.course.create({
        data: payload,
    });
    return result;
};

const getAllCoursesFromDB = async (query: any) => {
    const courseQuery = new QueryBuilder<typeof prisma.course>(prisma.course, query);
    const result = await courseQuery.search(['title', 'institution']).filter().sort().fields().paginate().execute();

    return result;
};

const getCourseByIdFromDB = async (id: string) => {
    const course = await prisma.course.findUnique({
        where: { id },
    });

    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    }

    return course;
};

const updateCourseIntoDB = async (id: string, payload: Partial<Course>) => {
    const course = await prisma.course.findUnique({
        where: { id },
    });

    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    }

    const result = await prisma.course.update({
        where: { id },
        data: payload,
    });

    return result;
};

const updateCourseCertificateIntoDB = async (id: string, file: Express.Multer.File | undefined) => {
    if (!file || file.fieldname !== 'certificate') {
        throw new AppError(httpStatus.BAD_REQUEST, 'Please provide certificate file');
    }

    const course = await prisma.course.findUnique({
        where: { id },
    });

    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    }

    const { Location } = await uploadToDigitalOceanAWS(file);
    const result = await prisma.course.update({
        where: { id },
        data: {
            certificate: Location,
        },
    });

    return result;
};

const deleteCourseFromDB = async (id: string) => {
    const course = await prisma.course.findUnique({
        where: { id },
    });

    if (!course) {
        throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    }

    const result = await prisma.course.delete({
        where: { id },
    });

    return result;
};

export const CourseServices = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    getCourseByIdFromDB,
    updateCourseIntoDB,
    updateCourseCertificateIntoDB,
    deleteCourseFromDB,
};
