const userServices = require("../services/user.services");
const {format} = require("date-fns");
const utils = require("../services/utils.services");

const register = async (req, res) => {
  try {
    console.log("register", req.body);
    let data = req.body;
    if (data.email) {
      const value = [data.email];
      const response = await userServices.getUserByEmail(value);
      console.log("emailresponse", response);
      if (response.status) {
        return res.status(200).send({
          status: false,
          data: false,
          message:
            "Email already exists, try logging in or use diffrent email.",
        });
      }
    }
    if (data.mobile) {
      const value = [data.mobile];
      const response = await userServices.getUserByMobile(value);
      console.log("mobileresponse", response);
      if (response.status) {
        return res.status(200).send({
          status: false,
          data: false,
          message:
            "Mobile already exists, try logging in or use diffrent mobile.",
        });
      }
    }
    let date_created = format(new Date(), "yyyy-MM-dd");
    let date_modified = format(new Date(), "yyyy-MM-dd");
    console.log("date", date_created);
    const values = [
      data.name,
      data.email,
      data.mobile,
      date_created,
      date_modified,
    ];
    const response = await userServices.saveUser(values);
    if (response.status) {
      console.log("token response", response);
      let token = utils.generateToken(response);
      response.token = token;
      console.log("token", token);
    }
    console.log("ye chal raha hai", response);
    res.status(200).send(response);
  } catch (error) {
    console.log("####error", error);
    res.status(500).send(false);
  }
};

const login = async (req, res) => {
  try {
    let mobile = req.body.mobile;
    if (mobile) {
      const value = [mobile];
      const response = await userServices.getUserByMobile(value);
      console.log("mobile response", response);
      if (!response.status) {
        return res.status(200).send({
          status: false,
          data: false,
          message: "Mobile is not exists, new user found",
        });
      } else {
        console.log("response.data.rows", response.data[0].id);
        let user_id = response.data[0].id;
        let generateOtp = await utils.generateOtp();
        console.log("Generating   OTP", generateOtp);
        let date_created = format(new Date(), "yyyy-MM-dd");
        let data = {};
        data.otp = generateOtp;
        await utils.sendMail(data);
        const otpValue = [user_id, generateOtp, date_created];
        let saveOTP = await userServices.saveOtp(otpValue);

        res.status(200).send(response);
      }
    }
  } catch (error) {
    console.log("Error generating", error);
    res.status(500).send(false);
  }
};

const verifyOtp = async (req, res) => {
  try {
    let mobile = req.body.mobile;
    let getOtpFromBody = req.body.otp;
    const value = [mobile];
    const response = await userServices.getUserByMobile(value);
    if (response.data[0].id > 0) {
      const valueOfUser_id = [response.data[0].id];
      const getOtp = await userServices.getOtpForVerification(valueOfUser_id);
      if (getOtp.status) {
        console.log("getOtp", getOtp);
        let otp = getOtp.data[0].otp;
        if (otp == getOtpFromBody) {
          console.log("####", valueOfUser_id[0]);
          let token = utils.generateToken(valueOfUser_id);
          console.log("token", token);
          return res.status(200).send({
            status: true,
            data: token,
            message: "login successfully",
          });
        } else {
          return res.status(200).send({
            status: false,
            message: "please try again",
          });
        }
      }
    }
  } catch (err) {
    console.log("Error generating", error);
    res.status(500).send(false);
  }
};

module.exports = {
  register,
  login,
  verifyOtp,
};

// async function registerPerson(person) {
//   const text = `
//     INSERT INTO people (fullname, gender, phone, age)
//     VALUES ($1, $2, $3, $4)
//     RETURNING id
//   `;
//   const values = [person.fullname, person.gender, person.phone, person.age];
//   return pool.query(text, values);
// }

// async function getPerson(personId) {
//   const text = `SELECT * FROM people WHERE id = $1`;
//   const values = [personId];
//   return pool.query(text, values);
// }

// async function updatePersonName(personId, fullname) {
//   const text = `UPDATE people SET fullname = $2 WHERE id = $1`;
//   const values = [personId, fullname];
//   return pool.query(text, values);
// }

// async function removePerson(personId) {
//   const text = `DELETE FROM people WHERE id = $1`;
//   const values = [personId];
//   return pool.query(text, values);
// }
