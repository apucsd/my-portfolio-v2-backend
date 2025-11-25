import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EducationServices } from './education.service';

const createEducation = catchAsync(async (req, res) => {
    const result = await EducationServices.createEducationIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Education created successfully',
        data: result,
    });
});

const getAllEducations = catchAsync(async (req, res) => {
    const result = await EducationServices.getAllEducationsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Educations retrieved successfully',
        ...result,
    });
});

const getEducationById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await EducationServices.getEducationByIdFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Education retrieved successfully',
        data: result,
    });
});

const updateEducation = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await EducationServices.updateEducationIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Education updated successfully',
        data: result,
    });
});

const deleteEducation = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await EducationServices.deleteEducationFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Education deleted successfully',
        data: result,
    });
});

export const EducationControllers = {
    createEducation,
    getAllEducations,
    getEducationById,
    updateEducation,
    deleteEducation,
};
