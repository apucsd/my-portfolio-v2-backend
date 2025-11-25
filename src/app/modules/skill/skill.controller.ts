import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SkillServices } from './skill.service';

const createSkill = catchAsync(async (req, res) => {
    const result = await SkillServices.createSkillIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Skill created successfully',
        data: result,
    });
});

const getAllSkills = catchAsync(async (req, res) => {
    const result = await SkillServices.getAllSkillsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Skills retrieved successfully',
        ...result,
    });
});

const getSkillById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SkillServices.getSkillByIdFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Skill retrieved successfully',
        data: result,
    });
});

const updateSkill = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SkillServices.updateSkillIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Skill updated successfully',
        data: result,
    });
});

const deleteSkill = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SkillServices.deleteSkillFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Skill deleted successfully',
        data: result,
    });
});

export const SkillControllers = {
    createSkill,
    getAllSkills,
    getSkillById,
    updateSkill,
    deleteSkill,
};
