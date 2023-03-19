// import { Request, Response } from "express";
// import { getRepository, getManager  } from "typeorm";
// import { Cart } from "../entities/Cart";

// class APICart {
//   static add = async (req: Request, res: Response) => {

//     const newCart: Partial<Cart> = req.body;

//     newCart.available = true;
//     newCart.accept = true;

//     if (typeof newCart.average_rate !== "string") {
//       newCart.average_rate = 0;
//     }

//     if (typeof newCart.sold_amount !== "string") {
//       newCart.sold_amount = 0;
//     }

//     // console.log("NewCart: ", newCart);

//     const CartRepository = await getRepository(Cart);
//     try {
//       await CartRepository.save(newCart);
//       return res.status(200).json({ status: "success", message: "Added Cart." });
//     } catch (error) {
//       return res.status(401).json({ status: "failure", message: error });
//     }

//   };

// }

// export default APICart;