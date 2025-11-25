import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExperienceServices } from './experience.service';

const createExperience = catchAsync(async (req, res) => {
    const result = await ExperienceServices.createExperienceIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Experience created successfully',
        data: result,
    });
});

const getAllExperiences = catchAsync(async (req, res) => {
    const result = await ExperienceServices.getAllExperiencesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Experiences retrieved successfully',
        ...result,
    });
});

const getExperienceById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ExperienceServices.getExperienceByIdFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Experience retrieved successfully',
        data: result,
    });
});

const updateExperience = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ExperienceServices.updateExperienceIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Experience updated successfully',
        data: result,
    });
});

const deleteExperience = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ExperienceServices.deleteExperienceFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Experience deleted successfully',
        data: result,
    });
});

export const ExperienceControllers = {
    createExperience,
    getAllExperiences,
    getExperienceById,
    updateExperience,
    deleteExperience,
};
