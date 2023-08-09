const express = require("express");
const { workFlowController } = require("../controller"); // Import your workflow controller
const { ErrorHandler } = require("../utils");
const { authUser, authAdmin } = require("../middleware");
const router = express.Router();

// Create a new workflow
router.post("/createWorkflow",authAdmin, async (req, res, next) => {
    try {
        const result = await workFlowController.createWorkFlow(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// Get all workflows
router.get("/workflows", async (req, res, next) => {
    try {
        const workflows = await workFlowController.getAllWorkFlows();
        res.json(workflows);
    } catch (error) {
        next(error);
    }
});



module.exports = router;