const { Workflow } = require("../models"); // Import your WorkFlow model

const createWorkFlow = async ({ title, approver, approvalType }) => {
    try {
        const approval = await Workflow.create({
            title,
            approver,
            approvalType,
        });
        return approval;
    } catch (error) {
        throw error;
    }
};

const getAllWorkFlows = async () => {
    try {
        const workflows = await Workflow.find();
        return workflows;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createWorkFlow,
    getAllWorkFlows,
};