import { Request, Response } from "express";
import { getRepository, getManager, EntityManager } from "typeorm";
import { Cart } from "../entities/Cart";
import { Ordered } from "../entities/Ordered";

const { v4: uuidv4 } = require('uuid');

class OrderListProduct {
    static order = async (req: Request, res: Response) => {

        // example payload: [{product_id, customer_id, note}, {}...]
        // we should set note = "" instead of note = null -> error
        const listProOrder: Partial<Ordered>[] = req.body;
        try {
            await getManager().transaction(async (transactionalEntityManager) => {

                for (const pro of listProOrder) {
                    //find product in cart
                    let deleteProduct = await transactionalEntityManager.findOneOrFail(Cart, { where: { product_id: pro.product_id, user_id: pro.customer_id } })

                    //delete product in cart
                    await transactionalEntityManager.delete(Cart, { product_id: pro.product_id, user_id: pro.customer_id });
                    // console.log("delete product in cart successfully. ")
                    //add product to ordered
                    const order = new Ordered();
                    Object.assign(order, pro);

                    //NOTE: if customer change amout for product=> first, we will update it in cart
                    // then, we get new amout.
                    order.amount = deleteProduct.amount;
                    order.order_id = uuidv4(); // tạo mã duy nhất
                    order.date_time = new Date();

                    console.log("add order: ", order);

                    await transactionalEntityManager.save(order);
                }
            });

        } catch (error) {
            console.log("order is fail.")

            return res.status(401).json({ status: "failure", message: "Đơn hàng sai thông tin." })
        }
        console.log("order successfully.")

        return res.status(200).json({ status: "success", message: "Đặt hàng thành công!" });
    };

}

export default OrderListProduct;
