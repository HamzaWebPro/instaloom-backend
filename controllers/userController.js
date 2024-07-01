const { emailValidation } = require("../helpers/emailValidation");
const {
  generatedUserNameValidation,
} = require("../helpers/generatedUserNameValidation");
const { validateTextLength } = require("../helpers/usernameValidation");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.newUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      profilePicture,
      coverPicture,
      birthMonth,
      birthDate,
      birthYear,
      gender,
      varified,
      friends,
      followers,
      following,
      friendRequest,
      search,
      details,
    } = req.body;

    // user email validation
    if (!emailValidation(email)) {
      return res.status(400).json({
        message: "Invalid Email Address",
      });
    }

    //  check email exists or not
    const checkExistingEmail = await User.findOne({ email });

    if (checkExistingEmail) {
      return res.status(400).json({
        message: "Email Already Exists",
      });
    }
    // user name length validation
    if (!validateTextLength(firstName, 4, 15)) {
      return res.status(400).json({
        message:
          "User first name character length must be grater than 4 and less than 15.",
      });
    }
    if (!validateTextLength(lastName, 4, 15)) {
      return res.status(400).json({
        message:
          "User last name character length must be grater than 4 and less than 15.",
      });
    }
    // password length authentication
    if (!validateTextLength(password, 8, 40)) {
      return res.status(400).json({
        message: "password length must be grater than 8 and less than 40.",
      });
    }

    // password bcrypt
    const cryptedPassword = await bcrypt.hash(password, 10);

    // validate and generate uniq username based on fname and lname

    let generatedUserName =  firstName + lastName;
    
    let finalGeneratedUserName = await generatedUserNameValidation(
      generatedUserName
    );

    console.log(finalGeneratedUserName,"jjjj");

    // Assuming you have a User model
    const newUser = new User({
      firstName,
      lastName,
      userName: finalGeneratedUserName,
      email,
      password: cryptedPassword,
      profilePicture,
      coverPicture,
      birthMonth,
      birthDate,
      birthYear,
      gender,
      varified,
      friends,
      followers,
      following,
      friendRequest,
      search,
      details,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(404).json({
      message: "Cannot Create User",
    });
  }
};
