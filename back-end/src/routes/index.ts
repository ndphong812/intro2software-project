import { Router  } from "express";
import auth from "./auth";
import user from "./user";
import product from "./product";
import cart from "./cart";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/product", product);
routes.use("/cart", cart);

export default routes;