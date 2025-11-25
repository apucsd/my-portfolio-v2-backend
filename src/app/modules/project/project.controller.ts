import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProjectServices } from './project.service';

const createProject = catchAsync(async (req, res) => {
    const result = await ProjectServices.createProjectIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Project created successfully',
        data: result,
    });
});

const getAllProjects = catchAsync(async (req, res) => {
    const result = await ProjectServices.getAllProjectsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Projects retrieved successfully',
        ...result,
    });
});

const getProjectById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ProjectServices.getProjectByIdFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Project retrieved successfully',
        data: result,
    });
});

const updateProject = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ProjectServices.updateProjectIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Project updated successfully',
        data: result,
    });
});

const updateProjectImage = catchAsync(async (req, res) => {
    const { id } = req.params;
    const file = req.file;
    const result = await ProjectServices.updateProjectImageIntoDB(id, file as Express.Multer.File);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Project image updated successfully',
        data: result,
    });
});

const deleteProject = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ProjectServices.deleteProjectFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Project deleted successfully',
        data: result,
    });
});

export const ProjectControllers = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    updateProjectImage,
    deleteProject,
};
