const User = require("../models/userModel");

exports.generatedUserNameValidation = async (username) => {
  let isTrue = false;

  do {
    let user = await User.findOne({ userName: username });
    console.log(user, "meuser");
    if (user) {
      username += (+new Date() * Math.random()).toString().substring(0, 1);
      isTrue = true;
    } else {
      isTrue = false;
    }
  } while (isTrue);
  console.log("hey,", username);
  return username;
};
