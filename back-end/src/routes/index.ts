import { Router  } from "express";
import auth from "./auth";
import user from "./user";
import product from "./product";
import cart from "./cart";
import acceptSeller from "./acceptRegSeller";
import order from "./order";

import {checkAdmin} from "../middleware/checkAdmin";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", checkAdmin, user);
routes.use("/product", product);
routes.use("/cart", cart);
routes.use("/seller", acceptSeller);
routes.use("/order", order);

export default routes;