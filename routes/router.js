const routes = require("express").Router();
const user = require("./../controlers/user.controlers");
const ingredients = require("../controlers/ingredients.controlers");
const multer = require("multer");
// let upload = multer({storage: multer.memoryStorage()});
const verify = require("./auth");
const addCart = require("../controlers/cart.controlers");
const orders = require("../controlers/orders.controlers");

routes.post("/user/register", user.register);
routes.post("/user/sendOtp", user.login);
routes.post("/user/verifyOtp", user.verifyOtp);

routes.post(
  "/user/saveIngredients",
  multer().single("image"),
  ingredients.saveingredient
);
routes.get("/user/fetchAllIngredients", ingredients.fetchAllIngredients);
routes.get("/user/fetchIngredientsById/:id", ingredients.fetchlIngredientsById);
routes.put(
  "/user/updateIngredientsById/:id",
  ingredients.updateIngredientsById
);
routes.put("/user/deleteIngredientsById/:id", ingredients.deleteIngredients);

routes.post("/user/addCart", verify.verifyTOken, addCart.savecart);
routes.get("/user/fetchAllCarts", verify.verifyTOken, addCart.fetchAllCarts);
routes.get(
  "/user/fetchCartsById/:id",
  verify.verifyTOken,
  addCart.fetchCartsById
);
routes.put(
  "/user/deleteCartsById/:id",
  verify.verifyTOken,
  addCart.deleteCartsById
);

routes.post("/user/saveOrder", verify.verifyTOken, orders.saveOrder);
routes.get("/user/fetchAllOrders", verify.verifyTOken, orders.fetchAllOrders);

module.exports = routes;
