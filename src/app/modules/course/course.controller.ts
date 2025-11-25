import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Course created successfully',
        data: result,
    });
});

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Courses retrieved successfully',
        ...result,
    });
});

const getCourseById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.getCourseByIdFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Course retrieved successfully',
        data: result,
    });
});

const updateCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.updateCourseIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Course updated successfully',
        data: result,
    });
});

const updateCourseCertificate = catchAsync(async (req, res) => {
    const { id } = req.params;
    const file = req.file;
    const result = await CourseServices.updateCourseCertificateIntoDB(id, file as Express.Multer.File);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Course certificate updated successfully',
        data: result,
    });
});

const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourseFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Course deleted successfully',
        data: result,
    });
});

export const CourseControllers = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    updateCourseCertificate,
    deleteCourse,
};
