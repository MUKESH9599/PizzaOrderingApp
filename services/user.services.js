const res = require("express/lib/response");
const {clientConnection} = require("../models/postgres");

const saveUser = async (values) => {
  let result = {status: false, data: "", message: ""};
  try {
    const text = `
        INSERT INTO users (name, email, mobile,date_created,date_modified)
        VALUES ($1, $2, $3,$4,$5)
        RETURNING id
      `;
    const response = await clientConnection(text, values);
    if (response) {
      result.status = true;
      result.data = response.rows;
      result.message = "data saved successfully";
    }
  } catch (err) {
    console.log("saveUser", err);
    result.status = false;
    result.data = "";
    result.message = err;
  }
  return result;
};

const getUserByEmail = async (values) => {
  try {
    let result = {status: false, data: "", message: ""};
    const text = `SELECT id,email FROM users WHERE email = $1`;
    const response = await clientConnection(text, values);
    console.log("response", response.rows);
    if (response.rows.length > 0) {
      result.status = true;
      result.data = response.rows;
      result.message = "data fatched successfully";
    } else {
      result.status = false;
      result.data = "";
      result.message = "data not found";
    }
    return result;
  } catch (err) {
    console.log("getUserByEmail", err);
  }
};
const getUserByMobile = async (values) => {
  try {
    let result = {status: false, data: "", message: ""};
    const text = `SELECT id,mobile,email FROM users WHERE mobile = $1`;
    const response = await clientConnection(text, values);
    if (response.rows.length > 0) {
      result.status = true;
      result.data = response.rows;
      result.message = "data fatched successfully";
    } else {
      result.status = false;
      result.data = "";
      result.message = "data not found";
    }
    return result;
  } catch (err) {
    console.log("getUserByMobile", err);
  }
};
const saveOtp = async (values) => {
  try {
    let result = {status: false, data: "", message: ""};
    const text = `INSERT INTO otp (user_id, otp,date_created)
        VALUES ($1, $2, $3)
        RETURNING id`;
    const response = await clientConnection(text, values);
    if (response.rows.length > 0) {
      result.status = true;
      result.data = response.rows;
      result.message = "data saved successfully";
    } else {
      result.status = false;
      result.data = "";
      result.message = "data not found";
    }
    return result;
  } catch (err) {
    console.log("getUserByMobile", err);
  }
};
const getOtpForVerification = async (values) => {
  try {
    let result = {status: false, data: "", message: ""};
    const text = `SELECT otp FROM otp WHERE user_id = $1 ORDER BY id DESC LIMIT 1`;
    const response = await clientConnection(text, values);
    if (response.rows.length > 0) {
      result.status = true;
      result.data = response.rows;
      result.message = "data found successfully";
    } else {
      result.status = false;
      result.data = "";
      result.message = "data not found";
    }
    return result;
  } catch (err) {
    console.log("getUserByMobile", err);
  }
};

module.exports = {
  saveUser,
  getUserByEmail,
  getUserByMobile,
  saveOtp,
  getOtpForVerification,
};
