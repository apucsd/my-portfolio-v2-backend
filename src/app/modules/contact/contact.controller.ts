import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ContactServices } from './contact.service';

// Contact Form Controllers
const createContactForm = catchAsync(async (req, res) => {
    const result = await ContactServices.createContactFormIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Contact form submitted successfully',
        data: result,
    });
});

const getAllContactForms = catchAsync(async (req, res) => {
    const result = await ContactServices.getAllContactFormsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Contact forms retrieved successfully',
        ...result,
    });
});

const getContactFormById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ContactServices.getContactFormByIdFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Contact form retrieved successfully',
        data: result,
    });
});

const deleteContactForm = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ContactServices.deleteContactFormFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Contact form deleted successfully',
        data: result,
    });
});

// Contact Links Controllers
const createContactLinks = catchAsync(async (req, res) => {
    const result = await ContactServices.createContactLinksIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Contact links created successfully',
        data: result,
    });
});

const getAllContactLinks = catchAsync(async (req, res) => {
    const result = await ContactServices.getAllContactLinksFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Contact links retrieved successfully',
        ...result,
    });
});

const getContactLinksById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ContactServices.getContactLinksByIdFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Contact links retrieved successfully',
        data: result,
    });
});

const updateContactLinks = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ContactServices.updateContactLinksIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Contact links updated successfully',
        data: result,
    });
});

const deleteContactLinks = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ContactServices.deleteContactLinksFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Contact links deleted successfully',
        data: result,
    });
});

export const ContactControllers = {
    createContactForm,
    getAllContactForms,
    getContactFormById,
    deleteContactForm,
    createContactLinks,
    getAllContactLinks,
    getContactLinksById,
    updateContactLinks,
    deleteContactLinks,
};
