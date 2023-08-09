const express = require("express")
const {userController} = require("../controller");
const {ErrorHandler} = require("../utils");
const router = express.Router();

router.post("/signup" , async(req,res,next)=>{
    try {
        const result = await userController.createUser(req.body);
        res.json(result);

    } catch (error) {
        next(error);
    }
})

router.post("/login",async(req,res,next)=>{
    try{
        const result = await userController.loginUser(req.body);
        res.json(result);

    }catch(error){
        next(new ErrorHandler(error));
    }
})

router.get("/getUserRole" , async(req,res,next)=>{
    try {
        const result = await userController.getUserRole(req.query);
        res.json(result);

    } catch (error) {
        next(new ErrorHandler(error))
    }
})
// Get All Approvers
router.get("/getApprover", async (req, res, next) => {
    try {
      const allApprover = await userController.getApprover();
      res.json(allApprover);
    } catch (error) {
      next(error);
    }
  });
  



module.exports = router; 
