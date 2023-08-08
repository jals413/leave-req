const express = require("express");
const { userController } = require("../controller");
const { ErrorHandler } = require("../utils");
const { authUser, authAdmin } = require("../middleware");
const router = express.Router();

// Create a new form
router.post("/submitForm", async (req, res, next) => {
    try {
        const result = await userController.createForm(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// Get all forms
router.get("/forms", async (req, res, next) => {
    try {
        const forms = await userController.getAllForms();
        res.json(forms);
    } catch (error) {
        next(error);
    }
});

// Get a specific form by ID
router.get("/forms/:id", async (req, res, next) => {
    try {
        const formId = req.params.id;
        const form = await userController.getFormById(formId);
        res.json(form);
    } catch (error) {
        next(error);
    }
});

// Update a specific form by ID
router.put("/forms/:id", async (req, res, next) => {
    try {
        const formId = req.params.id;
        const result = await userController.updateFormById(formId, req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// Delete a specific form by ID
router.delete("/forms/:id", async (req, res, next) => {
    try {
        const formId = req.params.id;
        const result = await userController.deleteFormById(formId);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
