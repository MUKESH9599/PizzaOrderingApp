const orderServices = require("../services/orders.services");
const ingredientServices = require("../services/ingredients.services");
const {format} = require("date-fns");

const saveOrder = async (req, res) => {
  try {
    let data = req.body;
    console.log("savecart", req.user, data);
    let user_id = req.user[0];
    let product_id = data.product_id;
    let quantity = data.quantity;
    let price;

    // In process

    // let value = [product_id];
    // let response = await ingredientServices.fetchIngredientById(value);
    // console.log(response);
    // if (response.status) {
    //   if (response.data.length > 0) {
    //     price = response.data[0].price;
    //   }
    // }
    // let totalPrice = price * quantity;

    let date_created = format(new Date(), "yyyy-MM-dd");
    let values = [user_id, product_id, quantity, totalPrice, date_created];
    let result = await orderServices.saveOrder(values);
    if (result.status) {
      res.status(200).send(result);
    }
  } catch (error) {
    console.log("####error", error);
    res.status(500).send(false);
  }
};

const fetchAllOrders = async (req, res) => {
  try {
    let user_id = req.user[0];
    let value = [user_id];
    let response = await orderServices.fetchAllOrders(value);
    console.log("####fetchAllOrders", response);
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
  saveOrder,
  fetchAllOrders,
};
