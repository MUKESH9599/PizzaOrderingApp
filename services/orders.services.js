const res = require("express/lib/response");
const {clientConnection} = require("../models/postgres");

const saveOrder = async (values) => {
  let result = {status: false, data: "", message: ""};
  try {
    const text = `
        INSERT INTO orders (user_id, product_id,quantity,total_price,date_created)
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

const fetchAllOrders = async (values) => {
  try {
    let result = {status: false, data: "", message: ""};
    const text = `
              SELECT * FROM orders WHERE user_id = $1
                `;
    const response = await clientConnection(text, values);
    if (response) {
      result.status = true;
      result.data = response.rows;
      result.message = "data saved successfully";
    }
    return result;
  } catch (err) {
    console.log("fetchAllCarts", err);
  }
};

module.exports = {saveOrder, fetchAllOrders};
