import { Request, Response } from "express";
import { getRepository, getManager, EntityManager, In } from "typeorm";
import { Cart } from "../entities/Cart";
import { Product } from "../entities/Product";
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

                    //get sale_price in product
                    let product = await transactionalEntityManager.findOneOrFail(Product, { where: { product_id: pro.product_id } });

                    //NOTE: if customer change amout for product=> first, we will update it in cart
                    // then, we get new amout.
                    order.amount = deleteProduct.amount;
                    order.order_id = uuidv4(); // tạo mã duy nhất
                    order.date_time = new Date();
                    order.status = "chờ xác nhận";
                    order.total_monney = order.amount * product.sale_price;

                    // console.log("add order: ", order);

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

    static getAll = async (req: Request, res: Response) => {
        let customer_id = req.body.customer_id || "";

        const orderRepository = getRepository(Ordered);
        let orders = await orderRepository.find({
            where: { customer_id: customer_id, status: In(["chờ xác nhận", "đang giao"]) },
        });

        res.status(200).json({ orders });
    }

    static historyOrder = async (req: Request, res: Response) => {
        let customer_id = req.body.customer_id || "";

        const orderRepository = getRepository(Ordered);
        let orders = await orderRepository.find({
            where: { customer_id: customer_id, status: "đã giao" },
        });

        res.status(200).json({ orders });
    }

    // User can delete order before 3 days.
    static delete = async (req: Request, res: Response) => {
        let { customer_id, order_id } = req.body;
        const deleteOrderRepository = getRepository(Ordered);

        try {
            let order = new Ordered();
            order = await deleteOrderRepository.findOneOrFail({
                where: { customer_id: customer_id, order_id: order_id },
            });

            // check time
            let today = new Date();
            let time = Math.abs(Number(today) - Number(order.date_time)) / (1000 * 60 * 60 * 24);

            if (time <= 3) {
                await deleteOrderRepository.delete(order as any);
                return res.status(200).json({ status: "success", message: "Đã xóa đơn hàng thành công." })
            } else {
                return res.status(401).json({ status: "failure", message: "Đơn hàng đã quá 3 ngày kể từ ngày khởi tạo, bạn không thể hủy." })
            }

        } catch (error) {
            return res.status(401).json({ status: "failure", message: "Không tìm thấy đơn hàng." });
        }
    };

    // update status 
    static updateStatus = async (req: Request, res: Response) => {

        //example payload: {order_id, product_id, customer_id, status}

        let customer_id = req.body.customer_id || "";
        let product_id = req.body.product_id || "";
        let status = req.body.status || "";
        let order_id = req.body.order_id || "";

        if (status != "đang giao" && status != "đã giao") {
            return res.status(401).json({ status: "failure", message: "Thông tin không chính xác, vui lòng xem lại." })
        }

        try {
            const orderRepository = getRepository(Ordered);

            let order = await orderRepository.findOneOrFail({
                where: { customer_id: customer_id, product_id: product_id, status: In(["chờ xác nhận", "đang giao"]), order_id: order_id },
            });

            //exist order in Db => update
            order.status = status;

            await orderRepository.update(
                { customer_id: customer_id, product_id: product_id, order_id: order_id },
                order,
            );

            return res.status(200).json({ status: "success", message: "Cập nhật thành công!" });

        } catch (error) {
            return res.status(401).json({ status: "failure", message: "Thông tin sai, vui lòng xem lại." });
        }
    };
}

export default OrderListProduct;
