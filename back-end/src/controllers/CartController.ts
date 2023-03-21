import { Request, Response } from "express";
import { getRepository, getManager  } from "typeorm";
import { Cart } from "../entities/Cart";

class APICart {
  static add = async (req: Request, res: Response) => {

    const newCart: Partial<Cart> = req.body;
    const CartRepository = await getRepository(Cart);
    try {
      await CartRepository.save(newCart);
      return res.status(200).json({ status: "success", message: "Added Cart." , product: newCart});
    } catch (error) {
      return res.status(401).json({ status: "failure", message: error });
    }

  };

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
        product =  await deleteProductRepository.findOneOrFail({
          where: {  product_id: product_id, user_id: user_id },
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
    let products =  await cartRepository.find({
        where: { user_id: user_id },
      });

    res.status(200).json({products});
  }

}

export default APICart;