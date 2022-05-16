const res = require("express/lib/response");
const {clientConnection} = require("../models/postgres");

const saveingredient = async (values) => {
  let result = {status: false, data: "", message: ""};
  try {
    const text = `
        INSERT INTO ingredients (item_name, size_id, price,offer,date_created,date_modified,file_name)
        VALUES ($1, $2, $3,$4,$5,$6,$7)
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

const fetchItemSize = async (values) => {
  let result = {status: false, data: "", message: ""};
  try {
    const text = `
      SELECT id FROM item_size WHERE size = $1
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

const fetchAllIngredients = async () => {
  try {
    let result = {status: false, data: "", message: ""};
    const text = `
        SELECT * FROM ingredients 
          `;
    const response = await clientConnection(text);
    if (response) {
      result.status = true;
      result.data = response.rows;
      result.message = "data saved successfully";
    }
    return result;
  } catch (err) {
    console.log("fetchAllIngredients", err);
  }
};

const fetchIngredientById = async (values) => {
  try {
    let result = {status: false, data: "", message: ""};
    const text = `
            SELECT * FROM ingredients WHERE id = $1
              `;
    const response = await clientConnection(text, values);
    if (response) {
      result.status = true;
      result.data = response.rows;
      result.message = "data saved successfully";
    }
    return result;
  } catch (err) {
    console.log("fetchAllIngredients", err);
  }
};

const updateIngredientById = async (values, column) => {
  try {
    let result = {status: false, data: "", message: ""};
    let length = column.length;
    let columns = [];
    let strColumn = "";

    for (let i = 0; i < length; i++) {
      let value = i + 2;
      columns.push(column[i] + "=" + "$" + value);
    }
    if (columns.length > 0) {
      strColumn = columns.join(" , ");
    }
    console.log("columns", columns, strColumn);
    const text = `UPDATE ingredients SET  
    ${strColumn}
     WHERE id = $1`;
    const response = await clientConnection(text, values);
    if (response) {
      result.status = true;
      result.data = response.rows;
      result.message = "data update successfully";
    }
    return result;
  } catch (err) {
    console.log("fetchAllIngredients", err);
  }
};

const deleteIngredientById = async (values) => {
  try {
    let result = {status: false, data: "", message: ""};
    const text = `
                    DELETE FROM ingredients WHERE id = $1
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

module.exports = {
  saveingredient,
  fetchItemSize,
  fetchAllIngredients,
  fetchIngredientById,
  updateIngredientById,
  deleteIngredientById,
};
