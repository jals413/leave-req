const authUser=require("./authUser");
const catchAsyncError=require("./catchAsyncErrors");
const errorMiddleware=require("./error");
const authAdmin=require("./authAdmin");
const authApprover=require("./authApprover");

module.exports={
    authUser,
    catchAsyncError,
    errorMiddleware,
    authAdmin,
    authApprover,
}