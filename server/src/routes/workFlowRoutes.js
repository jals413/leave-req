const express = require("express");
const { workflowController } = require("../controller"); // Import your workflow controller
const { ErrorHandler } = require("../utils");
const { authUser, authAdmin } = require("../middleware");
const router = express.Router();

// Create a new workflow
router.post("/createWorkflow", async (req, res, next) => {
    try {
        const result = await workflowController.createWorkFlow(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// Get all workflows
router.get("/workflows", async (req, res, next) => {
    try {
        const workflows = await workflowController.getAllWorkFlows();
        res.json(workflows);
    } catch (error) {
        next(error);
    }
});

// Get a specific workflow by ID
router.get("/workflows/:id", async (req, res, next) => {
    try {
        const workflowId = req.params.id;
        const workflow = await workflowController.getWorkFlowById(workflowId);
        res.json(workflow);
    } catch (error) {
        next(error);
    }
});

// Update a specific workflow by ID
router.put("/workflows/:id", async (req, res, next) => {
    try {
        const workflowId = req.params.id;
        const result = await workflowController.updateWorkFlowById(workflowId, req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// Delete a specific workflow by ID
router.delete("/workflows/:id", async (req, res, next) => {
    try {
        const workflowId = req.params.id;
        const result = await workflowController.deleteWorkFlowById(workflowId);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
