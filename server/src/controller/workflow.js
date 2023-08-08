const { WorkFlow } = require("../models"); // Import your WorkFlow model

const createWorkFlow = async ({ title, approver, approvalType }) => {
    try {
        const approval = await WorkFlow.create({
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
        const workFlows = await WorkFlow.find();
        return workFlows;
    } catch (error) {
        throw error;
    }
};

const getWorkFlowById = async (workflowId) => {
    try {
        const workFlow = await WorkFlow.findById(workflowId);
        if (!workFlow) {
            throw new Error("WorkFlow not found");
        }
        return workFlow;
    } catch (error) {
        throw error;
    }
};

const updateWorkFlowById = async (workflowId, { title, approver, approvalType }) => {
    try {
        const updatedWorkFlow = await WorkFlow.findByIdAndUpdate(
            workflowId,
            {
                title,
                approver,
                approvalType,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedWorkFlow) {
            throw new Error("WorkFlow not found");
        }

        return updatedWorkFlow;
    } catch (error) {
        throw error;
    }
};

const deleteWorkFlowById = async (workflowId) => {
    try {
        const deletedWorkFlow = await WorkFlow.findByIdAndDelete(workflowId);

        if (!deletedWorkFlow) {
            throw new Error("WorkFlow not found");
        }

        return deletedWorkFlow;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createWorkFlow,
    getAllWorkFlows,
    getWorkFlowById,
    updateWorkFlowById,
    deleteWorkFlowById,
};
