import { Request, Response } from "express";
import { type } from "os";
import { getRepository, getManager, createQueryBuilder } from "typeorm";
import { Cart } from "../entities/Cart";

class APICart {
  static add = async (req: Request, res: Response) => {

    const newCart: Partial<Cart> = req.body.newCart;
    // const newCart: Partial<Cart> = req.body;

    // console.log("NewCart: ", typeof newCart.amount);

    const CartRepository = await getRepository(Cart);
    try {
      const product = await CartRepository.findOne({
        where: {
          product_id: newCart.product_id,
          user_id: newCart.user_id
        }
      })

      //if amount from body is null or <=0
      if (!newCart.amount || newCart.amount <= 0) {
        return res.status(401).json({ status: "failure", message: "Số lượng cần mua không đúng." });
      }

      // Product is not exist cart  => add product to cart
      if (!product) {
        try {
          await CartRepository.save(newCart);
          return res.status(200).json({ status: "success", message: "Đã thêm sản phẩm vào giỏ", product: newCart });
        } catch (error) {
          return res.status(401).json({ status: "failure", message: error });
        }

      }
      //else update new product to cart
      let newamout: number = newCart.amount - 1 + 1 + product.amount; // dont revise this line
      newCart.amount = newamout;

      const result = await CartRepository.update(
        { product_id: newCart.product_id, user_id: newCart.user_id },
        newCart,
      );
      if (result.affected === 0) {
        return res.status(401).json({ status: "failure", message: "Không tìm thấy sản phẩm này." });
      } else {
        return res.status(200).json({ status: "success", message: "Cập nhật số lượng thành công." });
      }
    } catch (error) {
      console.log(error)
      return res.status(401).json({ status: "failure", message: "Thất bại, sản phẩm sai." });
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
      return res.status(401).json({ status: "failure", message: "Không tìm thấy sản phẩm." });
    } else {
      return res.status(200).json({ status: "success", message: "Đã cập nhật số lượng thành công." });
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
        return res.status(200).json({ status: "success", message: "Đã xóa thành công." })
      }
      //has an undefined attribute  
      return res.status(401).json({ status: "failure", message: "Không thể xóa sản phẩm này." })

    } catch (error) {
      return res.status(401).json({ status: "failure", message: "Thất bại, không tìm thấy sản phẩm." });
    }
  }
  static getAll = async (req: Request, res: Response) => {
    let { user_id } = req.body;

    //use try-catch to avoid erorr about DB.
    try {
      const products = await createQueryBuilder(Cart, "cart")
      .innerJoinAndSelect("cart.product_id", "product")
      .where("cart.user_id = :user_id", { user_id: user_id })
      .getMany();

      if (!products[0]) {
        // Giỏ hàng trống
        return res.status(200).json({ status: false , message: "Giỏ hàng trống" });

      } else {
        // Giỏ hàng có sản phẩm
        return res.status(200).json({ status: true, cart: products});
      }

    } catch (error) {
      return res.status(401).send("Hệ thống đang có vấn đề, vui lòng quay lại sau.");
    }
  }

}

export default APICart;