const { Form,Workflow } = require("../models"); // Import your Form model

const createForm = async ({
    topic,
    status,
    body,
    requestor,
    file }) => {
    try {
        const result = await Form.create({
            topic,
            status,
            body,
            requestor,
            file
        });
        return result;
    } catch (error) {
        throw error;
    }
}

const getFormsByUser= async(userName)=>{
  try {
    const result =await Form.find({requestor:userName})
    return result;
  } catch (error) {
    throw error;
  }
}
const getForms = async (queryParams) => {
  try {
    let query = {};

    // Filter by status
    query.status = "Processing"; // Filter by Processing status only

    // If date range is given (today, this week, this month, this year)
    if (queryParams.dateRange) {
      const currentDate = new Date();

      if (queryParams.dateRange === 'today') {
        const startOfDay = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
        query.createdAt = { $gte: startOfDay };
      } else if (queryParams.dateRange === 'thisWeek') {
        const startOfWeek = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - currentDate.getDay()
        );
        query.createdAt = { $gte: startOfWeek };
      } else if (queryParams.dateRange === 'thisMonth') {
        const startOfMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        query.createdAt = { $gte: startOfMonth };
      } else if (queryParams.dateRange === 'thisYear') {
        const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
        query.createdAt = { $gte: startOfYear };
      }
    }

    // Find and sort forms based on query
    const forms = await Form.find(query).sort({ createdAt: -1 });
    return forms;
  } catch (error) {
    throw error;
  }
};


  const getAllForms = async () => {
    try {
      const forms = await Form.find()
        .sort({ createdAt: -1 })
        .select('topic createdAt status body requestor'); // Include 'requestor' in the select field list
      return forms;
    } catch (error) {
      throw error;
    }
  };
  
  
  const getPendingFormsForApprover = async ({userName}) => {
    try {
      // First, get all pending forms for the user
      const pendingForms = await Form.find({
        status: 'Processing' // Assuming 'Processing' is the status for pending forms
      }).sort({ createdAt: -1 });
  
      // Get all workflow titles for the user
      const workflowsForApprover = await Workflow.find({
        approver: userName
      });
  
      // Filter pending forms where form topic matches workflow title and user is an approver
      const formsToApprove = pendingForms.filter((form) =>
        workflowsForApprover.some((workflow) =>
          workflow.title === form.topic
        )
      );
  
      return formsToApprove;
    } catch (error) {
      throw error;
    }
  };

const updateFormById = async (formId, { status, body,notes }) => {
    try {
        const updatedForm = await Form.findByIdAndUpdate(
            formId,
            {
              status,
                body,
                notes,
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
    getForms,
    updateFormById,
    deleteFormById,
    getAllForms,
    getPendingFormsForApprover,
    getFormsByUser
};
