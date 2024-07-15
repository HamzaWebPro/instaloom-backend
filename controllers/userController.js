const { emailValidation } = require("../helpers/emailValidation");
const {
  generatedUserNameValidation,
} = require("../helpers/generatedUserNameValidation");
const { sendVarificationEmail } = require("../helpers/mailer");
const { jwtToken } = require("../helpers/token");
const { validateTextLength } = require("../helpers/usernameValidation");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    let generatedUserName = firstName + lastName;

    let finalGeneratedUserName = await generatedUserNameValidation(
      generatedUserName
    );

    console.log(finalGeneratedUserName, "jjjj");

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

    const emailToken = jwtToken({ id: newUser._id.toString() }, "30m");
    const url = `${process.env.URL}/activate/${emailToken}`;
    sendVarificationEmail(newUser.email, newUser.firstName, url);
    const token = jwtToken({ id: newUser._id.toString() }, "7d");

    res.status(201).json({
      id: newUser._id,
      userName: newUser.userName,
      profilePicture: newUser.profilePicture,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      token: token,
      varified: newUser.varified,
      message: "Registration Successful!! Please ",
    });
  } catch (error) {
    res.status(404).json({
      message: "Cannot Create User",
    });
  }
};

exports.verifiedUser = async (req, res) => {
  try {
    const { token } = req.body;
    const user = jwt.verify(token, process.env.SECRET_TOKEN);

    const check = await User.findById(user.id);
    if (check.varified === true) {
      return res.status(400).json({
        message: "This Email is Already Varified!",
      });
    } else {
      await User.findByIdAndUpdate(user.id, { varified: true });
      return res.status(200).json({
        message: "Email Varification Successful!!",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User Not Found!",
      });
    }
    if(user.varified === false){
      return res.status(404).json({
        message: "User Not Varified!Please Check Email",
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(404).json({
        message: "Credential Error!",
      });
    }
    const token = jwtToken({ id: user._id.toString() }, "7d");
    res.status(201).json({
      id: user._id,
      userName: user.userName,
      profilePicture: user.profilePicture,
      firstName: user.firstName,
      lastName: user.lastName,
      token: token,
      varified: user.varified,
      message: "Login Successful!! ",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};
