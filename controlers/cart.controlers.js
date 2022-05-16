const cartServices = require("../services/cart.services");
const {format} = require("date-fns");

const savecart = async (req, res) => {
  try {
    let data = req.body;
    console.log("savecart", req.user, data);
    let user_id = req.user;
    let product_id = data.product_id;
    let date_created = format(new Date(), "yyyy-MM-dd");
    let values = [user_id, product_id, date_created];
    let result = await cartServices.savecart(values);
    if (result.status) {
      res.status(200).send(result);
    }
  } catch (error) {
    console.log("####error", error);
    res.status(500).send(false);
  }
};

const fetchAllCarts = async (req, res) => {
  try {
    let response = await cartServices.fetchAllCarts();
    console.log("####fetchAllCarts", response);
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

const fetchCartsById = async (req, res) => {
  try {
    let product_id = req.params.id;
    let user_id = req.user;
    let value = [product_id, user_id];
    let response = await cartServices.fetchCartsById(value);
    console.log("####fetchCartsById", response);
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

const deleteCartsById = async (req, res) => {
  try {
    let product_id = req.params.id;
    let user_id = req.user;
    let value = [product_id, user_id];
    let response = await cartServices.deleteCartById(value);
    console.log("####deleteCartsById", response);
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
  savecart,
  fetchAllCarts,
  fetchCartsById,
  deleteCartsById,
};
