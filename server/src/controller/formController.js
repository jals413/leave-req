const { Form } = require("../models"); // Import your Form model

const createForm = async ({ subject,
    topic,
    body,
    file }) => {
    try {
        const result = await Form.create({
            subject,
            topic,
            body,
            file
        });
        return result;
    } catch (error) {
        throw error;
    }
}

const getAllForms = async () => {
    try {
        const forms = await Form.find();
        return forms;
    } catch (error) {
        throw error;
    }
};

const getFormById = async (formId) => {
    try {
        const form = await Form.findById(formId);
        if (!form) {
            throw new Error("Form not found");
        }
        return form;
    } catch (error) {
        throw error;
    }
};
const updateFormById = async (formId, { subject, topic, body, file }) => {
    try {
        const updatedForm = await Form.findByIdAndUpdate(
            formId,
            {
                subject,
                topic,
                body,
                file,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedForm) {
            throw new Error("Form not found");
        }

        return updatedForm;
    } catch (error) {
        throw error;
    }
};

const deleteFormById = async (formId) => {
    try {
        const deletedForm = await Form.findByIdAndDelete(formId);

        if (!deletedForm) {
            throw new Error("Form not found");
        }
        return deletedForm;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createForm,
    getAllForms,
    getFormById,
    updateFormById,
    deleteFormById,
};
