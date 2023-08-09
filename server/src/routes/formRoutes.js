const express = require("express");
const {  formController } = require("../controller");
const { authUser, authAdmin, authApprover } = require("../middleware");
const router = express.Router();

// Create a new form
router.post("/submitForm", async (req, res, next) => {
    try {
        const result = await formController.createForm(req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
});


// Get a specific form by Query
router.get('/forms', async (req, res, next) => {
    try {
      const queryParams = {
        dateRange: req.query.dateRange,
      };
      const forms = await formController.getForms(queryParams);
      res.json(forms);
    } catch (error) {
      next(error);
    }
  });
  //Route for Audit Logs or full forms
  router.get('/getForms', async (req, res,next) => {
    try {
      const forms = await formController.getAllForms();
      res.json(forms);
    } catch (error){
      next(error);
    }
  });

// Update a specific form by ID
router.put("/forms/:id", async (req, res, next) => {
    try {
        const formId = req.params.id;
        const result = await formController.updateFormById(formId, req.body);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// Delete a specific form by ID
router.delete("/forms/:id", async (req, res, next) => {
    try {
        const formId = req.params.id;
        const result = await formController.deleteFormById(formId);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

//Get all pending Forms for Approver
router.get('/pending-forms',authApprover, async (req, res, next) => {
  try {
    const formsToApprove = await formController.getPendingFormsForApprover({userName:req.user.userName});

    res.json(formsToApprove);
  } catch (error) {
    next(error);
  }
});

module.exports = router;