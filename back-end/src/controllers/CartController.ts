import { Request, Response } from "express";
import { type } from "os";
import { getRepository, getManager } from "typeorm";
import { Cart } from "../entities/Cart";

class APICart {
  static add = async (req: Request, res: Response) => {

    const newCart: Partial<Cart> = req.body.newCart;

    // console.log("NewCart: ", newCart);

    const CartRepository = await getRepository(Cart);
    try {
      const product = await CartRepository.findOne({
        where: {
          product_id: newCart.product_id,
          user_id: newCart.user_id
        }
      })

      // Product is not exist cart  => add product to cart
      if (!product) {
        try {
          await CartRepository.save(newCart);
          return res.status(200).json({ status: "success", message: "Added to Cart.", product: newCart });
        } catch (error) {
          return res.status(401).json({ status: "failure", message: error });
        }

      }
      //else update new product to cart
      //if amount from body is null
      if (!newCart.amount) {
        return res.status(401).json({ status: "failure", message: "amount can not null." });
      }
      // else
      let newamout: number = newCart.amount - 1 + 1 + product.amount; // dont revise this line
      newCart.amount = newamout;

      const result = await CartRepository.update(
        { product_id: newCart.product_id, user_id: newCart.user_id },
        newCart,
      );
      if (result.affected === 0) {
        return res.status(401).json({ status: "failure", message: "product is not found." });
      } else {
        return res.status(200).json({ status: "success", message: "Updated product." });
      }
    } catch (error) {
      return res.status(401).json({ status: "failure", message: "ID product or ID user is wrong" });
    }

  };

  // user want to revise amout.
  static update = async (req: Request, res: Response) => {

    const newValues: Partial<Cart> = req.body;
    const updateProductRepository = await getRepository(Cart);

    const result = await updateProductRepository.update(
      { product_id: newValues.product_id, user_id: newValues.user_id },
      newValues,
    );
    if (result.affected === 0) {
      return res.status(401).json({ status: "failure", message: "product is not found." });
    } else {
      return res.status(200).json({ status: "success", message: "Updated product." });
    }
  }

  static delete = async (req: Request, res: Response) => {
    let { product_id, user_id } = req.body;

    const deleteProductRepository = getRepository(Cart);

    try {
      //check undefined
      if (product_id && user_id) {
        let product = new Cart();
        product = await deleteProductRepository.findOneOrFail({
          where: { product_id: product_id, user_id: user_id },
        });
        await deleteProductRepository.delete(product as any);
        return res.status(200).json({ status: "success", message: "Deleted product" })
      }
      //has an undefined attribute  
      return res.status(401).json({ status: "failure", message: "Can not deletet." })

    } catch (error) {
      return res.status(401).json({ status: "failure", message: "Product is not found." });
    }
  }
  static getAll = async (req: Request, res: Response) => {
    let { user_id } = req.body;

    const cartRepository = getRepository(Cart);
    let products = await cartRepository.find({
      where: { user_id: user_id },
    });

    res.status(200).json({ products });
  }

}

export default APICart;