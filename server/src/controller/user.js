const mongoose = require("mongoose");
const { User } = require("../models");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const {generateToken} = require("./userToken");
const jwt = require("jsonwebtoken");
const error = require("../middleware/error");

const getUserByEmail = async({
  userEmail,
}) => {
  try {
    const user = await User.findOne({userEmail : userEmail})
    if(user) return user
  } catch (error) {
    console.log(error);
  }
}
const getApprover = async () => {
  try {
    const user = await User.find({ userRole: "Approver" },{ userName: 1, _id: 0 });
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const loginUser = async ({
  userEmail,
  userPassword
}) => {
  try {
    const query = {
      $or:[{userEmail: userEmail},{userName: userEmail}]
    }
    const user = await User.findOne(query)
    if(!user)
    {
      throw new Error(" Incorrect Email or User Not Found");
    }
    const verifyPassword =  await bcrypt.compare(userPassword , user.userPassword );
    if(!verifyPassword)
    {
      throw new Error("Incorrect Password");
    }
    const {accessToken , refreshToken} = await generateToken(user);
      return {accessToken,refreshToken};
  } catch (error) {
    console.log(error);
  }
}

//Create User
const createUser = async ({
  userName,
  userEmail,
  userPassword,
  userRole,
}) => {
  try {
    const salt = await bcrypt.genSalt(Number(config.SALT));
    const hashPassword = await bcrypt.hash(userPassword, salt);
    const user = await User.create({
      userName,
      userEmail,
      userPassword: hashPassword,
      userRole,
    });

    return user;
  } catch (error) {
      throw error;
  }
};


const getUserRole = async({ token }) => {
  try {
    if(token)
    {
      const decoded = jwt.verify(
        token,
        config.ACCESS_TOKEN_PRIVATE_KEY
      );
      // console.log(decoded);

      return decoded.userRole; // change to user role 
    }
    else throw new Error("No token Found")
  } catch (error) {
    // console.log(error);
    throw error;
  }
}

module.exports = {createUser, getApprover,loginUser, getUserByEmail, getUserRole};
