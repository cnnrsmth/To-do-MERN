/* middleware file to apply various logic before route / controller logic is applied, and a response
generated*/

const express = require("express");
const Schemas = require("../models/schemas");
let jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

require("dotenv").config();

// Password validation function
function validatePassword(password) {
  const minLength = 6;
  const hasNumber = /\d/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    return {
      valid: false,
      error: "Password must be at least 6 characters long.",
    };
  }
  if (!hasNumber.test(password)) {
    return {
      valid: false,
      error: "Password must include at least one number.",
    };
  }
  if (!hasSpecialChar.test(password)) {
    return {
      valid: false,
      error: "Password must include at least one special character.",
    };
  }
  return { valid: true };
}

// Middleware for checking password validity
async function checkPassword(req, res, next) {
  const { password } = req.body;

  const { valid, error } = validatePassword(password);
  if (!valid) {
    return res.status(400).json({ error });
  }

  next();
}

//used for restricted functions. uses token generated when user logs in, to authenticate whether they have
//access to a specific route. also used to provide access for routes to the req.user object (e.g. for
//conditional rendering of tasks)
async function checkJWTToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({ message: "No authorization header." });
  const token = authHeader.split(" ")[1];
  try {
    const user = await jwt.verify(token, "secretkey");
    req.user = user.user;
    next();
  } catch (err) {
    return res.status(403).send({ message: "Invalid token." });
  }
}

//checks domain of email, and if it's not gmail, prevents task from being submitted
async function checkEmail(req, res, next) {
  const { email } = req.body; // Get email from the registration form
  const emailDomain = email.split("@")[1]; // Extract the domain from the email

  // Check if the domain is not gmail.com
  if (emailDomain !== "gmail.com") {
    // Send a response with status 403 if it's not a Gmail address
    return res.status(403).json({
      error: "We're currently only accepting gmail users. Please update email.",
    });
  }

  next(); // If it is a Gmail address, continue to the next middleware
}

//checks charLength, and if over 140char, prevents task from being submitted
async function checkTaskLength(req, res, next) {
  const task = req.body.task;
  if (task.length > 140) {
    res
      .status(422)
      .json({ error: "Task length cannot exceed 140 characters." });
  } else {
    next();
  }
}

//checks contentType of task, and if not .json(), prevents task from being submitted
async function checkContentType(req, res, next) {
  if (req.headers["content-type"] !== "application/json") {
    return res
      .status(400)
      .send({ message: "Invalid content-type, must be application/json." });
  }
  next();
}

//export for use in routes
module.exports = {
  checkJWTToken,
  checkEmail,
  checkTaskLength,
  checkContentType,
  checkPassword,
};
