const User = require("../models/userModel");

exports.emailValidation = (email) => {
  return String(email).toLowerCase().match(
    /^(?=[a-zA-Z0-9@]{1,256})(?:(?:[a-zA-Z0-9][a-zA-Z0-9._%+-]{0,63})|(?:\"[^\"]{0,62}\"))@(?:(?:[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])|(?:\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\]))\.(?:[a-zA-Z]{2,63})$/
  );
};