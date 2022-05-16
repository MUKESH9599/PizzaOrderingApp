const res = require("express/lib/response");
const {clientConnection} = require("../models/postgres");

const savecart = async (values) => {
  let result = {status: false, data: "", message: ""};
  try {
    const text = `
        INSERT INTO add_cart (user_id, product_id, date_created)
        VALUES ($1, $2, $3)
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

const fetchAllCarts = async () => {
  try {
    let result = {status: false, data: "", message: ""};
    const text = `
          SELECT * FROM add_cart 
            `;
    const response = await clientConnection(text);
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

const fetchCartsById = async (values) => {
  try {
    let result = {status: false, data: "", message: ""};
    const text = `
              SELECT * FROM add_cart WHERE product_id = $1 AND user_id = $2
                `;
    const response = await clientConnection(text, values);
    if (response) {
      result.status = true;
      result.data = response.rows;
      result.message = "data saved successfully";
    }
    return result;
  } catch (err) {
    console.log("fetchCartsById", err);
  }
};

const deleteCartById = async (values) => {
  try {
    let result = {status: false, data: "", message: ""};
    const text = `
                      DELETE FROM add_cart WHERE product_id = $1 AND user_id = $2
                    `;
    const response = await clientConnection(text, values);
    if (response) {
      result.status = true;
      result.data = response.rows;
      result.message = "data delete successfully";
    }
    return result;
  } catch (err) {
    console.log("fetchAllIngredients", err);
  }
};

module.exports = {savecart, fetchAllCarts, fetchCartsById, deleteCartById};
