const ingredientServices = require("../services/ingredients.services");
const {format} = require("date-fns");
const utils = require("../services/utils.services");
var fs = require("fs");

const saveingredient = async (req, res) => {
  console.log(
    "-----------",
    JSON.stringify(req.body),
    req.file.fieldname,
    req.file.buffer
  );
  try {
    let image = req.file;
    let data = req.body;
    let fileName = format(new Date(), "yyyyMMdd");

    fs.writeFile(
      `/home/mukeshmajoka/pizzaOderingApp/api/images/${fileName}.png`,
      req.file.buffer,
      (err) => {
        console.error(err);
      }
    );

    console.log("saveingredient", data);
    let sizeId;
    if (data.size) {
      sizeValue = [data.size];
      let response = await ingredientServices.fetchItemSize(sizeValue);
      if (response.status) {
        sizeId = response.data[0].id;
      }
    }
    let date_created = format(new Date(), "yyyy-MM-dd");
    let date_modified = format(new Date(), "yyyy-MM-dd");
    let values = [
      data.item_name,
      sizeId,
      data.price,
      data.offer,
      date_created,
      date_modified,
      fileName,
    ];
    let result = await ingredientServices.saveingredient(values);
    if (result.status) {
      res.status(200).send(result);
    }
  } catch (error) {
    console.log("####error", error);
    res.status(500).send(false);
  }
};

const fetchAllIngredients = async (req, res) => {
  try {
    let response = await ingredientServices.fetchAllIngredients();
    console.log("####fetchAllIngredients", response);
    if (response.status) {
      res.status(200).send(response);
    }
  } catch (error) {
    console.log("####error", error);
    res.status(500).send({
      status: false,
      data: false,
      message: error,
    });
  }
};

const fetchlIngredientsById = async (req, res) => {
  try {
    let id = req.params.id;
    let value = [id];
    let response = await ingredientServices.fetchIngredientById(value);
    console.log("####fetchAllIngredients", response);
    if (response.status) {
      res.status(200).send(response);
    }
  } catch (error) {
    console.log("####error", error);
    res.status(500).send({
      status: false,
      data: false,
      message: error,
    });
  }
};

const updateIngredientsById = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let columns = [];
    let value = [id];

    if (data.price) {
      columns.push("price");
      value.push(data.price);
    }
    if (data.item_name) {
      columns.push("item_name");
      value.push(data.item_name);
    }
    if (data.offer) {
      columns.push("offer");
      value.push(data.offer);
    }
    console.log("updateIngredientsById", value, columns);

    let response = await ingredientServices.updateIngredientById(
      value,
      columns
    );
    console.log("####fetchAllIngredients", response);
    if (response.status) {
      res.status(200).send(response);
    }
    // res.status(200).send(true);
  } catch (error) {
    console.log("####error", error);
    res.status(500).send({
      status: false,
      data: false,
      message: error,
    });
  }
};

const deleteIngredients = async (req, res) => {
  try {
    let id = req.params.id;
    let value = [id];
    let response = await ingredientServices.deleteIngredientById(value);
    console.log("####fetchAllIngredients", response);
    if (response.status) {
      res.status(200).send(response);
    }
  } catch (error) {
    console.log("####error", error);
    res.status(500).send({
      status: false,
      data: false,
      message: error,
    });
  }
};

module.exports = {
  saveingredient,
  fetchAllIngredients,
  fetchlIngredientsById,
  updateIngredientsById,
  deleteIngredients,
};
