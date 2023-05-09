import { Request, Response } from "express";
import { getRepository, getManager, IsNull } from "typeorm";
import { Product } from "../entities/Product";
import { In } from "typeorm";

const { v4: uuidv4 } = require('uuid');


class APIProduct {
  static add = async (req: Request, res: Response) => {

    //example payload: { user_id, owner_id, original_price, sale_price, name, detail, stock, image_link, ?average_rate, ?sold_amount, type, brand }
    // Note: user_id = owner_id -> seller can only add product which they own.

    const newProduct: Partial<Product> = req.body;

    newProduct.product_id = uuidv4(); // tạo mã duy nhất
    newProduct.available = true;
    newProduct.accept = false;

    if (!newProduct.average_rate) {
      newProduct.average_rate = 0;
    }

    if (!newProduct.sold_amount) {
      newProduct.sold_amount = 0;
    }

    const productRepository = await getRepository(Product);
    try {
      await productRepository.save(newProduct);
      return res.status(200).json({ status: "success", message: "Thêm sản phẩm thành công." });
    } catch (error) {
      return res.status(401).json({ status: "failure", message: "Thêm sản phẩm thất bại." });
    }

  };

  static update = async (req: Request, res: Response) => {

    //example payload: { user_id, "owner_id", product_id, attributes need to update }

    const newValues: Partial<Product> = req.body;
    if (typeof newValues.available === "string") {
      newValues.available = JSON.parse(newValues.available);
    }
    if (typeof newValues.accept === "string") {
      newValues.accept = JSON.parse(newValues.accept);
    }

    // To avoid error ->  delete attribute user_id in newValues
    if ("user_id" in newValues) {
      delete newValues.user_id;
    }

    //seller can not update attribute accept.
    newValues.accept = true; // true and false in this line is same
    delete newValues.accept; // because we will delete attribute accept in this line

    // console.log("NewValue-Partial: ", newValues);

    try {
      const updateProductRepository = await getRepository(Product);

      await updateProductRepository.update(
        { product_id: newValues.product_id, owner_id: newValues.owner_id },
        newValues,
      );

      return res.status(200).json({ status: "success", message: "Cập nhật thông tin sản phẩm thành công." });

    } catch (error) {
      return res.status(401).json({ status: "failure", message: "Cập nhật thông tin sản phẩm thất bại." });
    }

  }

  static delete = async (req: Request, res: Response) => {

    //example payload: {user_id, owner_id, product_id}

    let { product_id, owner_id } = req.body;

    const deleteProductRepository = getRepository(Product);

    //check undefined
    if (!product_id) {
      product_id = "";
    }

    try {
      let productDB = new Product();
      productDB = await deleteProductRepository.findOneOrFail({
        where: { product_id: product_id, owner_id: owner_id },
      });
      // if this product has not been approved-> seller can delete request -> delete in DB
      if (productDB.accept == false) {
        await deleteProductRepository.delete(productDB as any);
      }
      // else set available = false
      else {
        productDB.available = false;
        await deleteProductRepository.update(
          { product_id: productDB.product_id, owner_id: productDB.owner_id },
          productDB,
        );
      }

      return res.status(200).json({ status: "success", message: "Đã xóa sản phẩm thành công." })

    } catch (error) {
      //Have error  
      return res.status(401).json({ status: "failure", message: "Không tìm thấy sản phẩm cần xóa." });
    }
  }

  static search = async (req: Request, res: Response) => {
    const { name } = req.body;
    const productRepository = getRepository(Product);
    try {

      let products: Product[];
      products = await productRepository.find({ where: { name: name } });
      if (!products.length) {
        return res.status(400).send({
          status: "failed",
          message: "There is not product existed"
        });
      }
      else {
        return res.status(200).send({
          status: "success",
          message: "Success",
          data: products
        });
      }
    } catch (error) {
      return res.status(401).json({ status: "failure", message: error });
    }
  };

  // get product  of seller which is requesting
  static productSellerRequest = async (req: Request, res: Response) => {
    //example payload: {user_id, owner_id}

    const owner_id = req.body.owner_id;
    console.log("owner_id", owner_id)
    console.log("user_id", req.body.user_id)
    const products = await getRepository(Product).find({
      where: { accept: false, available: true, owner_id: owner_id }
    });

    res.status(200).json({ products });
  }

  // get product accepted of seller .
  static productSellerAccepted = async (req: Request, res: Response) => {
    //example payload: {user_id, owner_id}

    const owner_id = req.body.owner_id;

    const products = await getRepository(Product).find({
      where: { accept: true, available: true, owner_id: owner_id }
    });

    res.status(200).json({ products });
  }

  // all products accepted -> display for user
  static getAll = async (req: Request, res: Response) => {
    // get page
    let page = Number(req.query.page) || 1;
    let perpage = 8;

    // console.log("page: ", page);
    // console.log("type: ", req.query.page);

    // const products = await getRepository(Product).find({
    //   skip: (page - 1) * perpage,
    //   take: perpage,
    //   where: { accept: true, available: true }
    // });
    // console.log("page: ", page);

    let products = await getRepository(Product).find({
      where: { accept: true, available: true }
    });

    var numberOfPages: number = products.length > 0 ? Math.ceil(products.length / perpage) : 0;

    var result = products.slice((page - 1) * perpage, page * perpage);

    // console.log("products: ", result);

    res.status(200).json({ products: result, numberOfPages });
  };

  // admin accept list product of seller
  static acceptListProduct = async (req: Request, res: Response) => {

    //example payload: { idAdmin: ..., emailAdmin..., listProduct: [ {product_id:..., owner_id:...}, {...}] }

    const listProduct: Partial<Product>[] = req.body.listProduct;

    let listAccept: string = "Accepted : ";
    let listError: string = "listError : ";

    const acceptProductRepository = getRepository(Product);

    //list product may be error
    try {
      //we dont need to use transaction
      for (const pro of listProduct) {
        try {
          let acceptProduct = await acceptProductRepository.findOneOrFail(
            {
              where: { product_id: pro.product_id, owner_id: pro.owner_id, available: true, accept: false }
            })

          // update accept = true
          acceptProduct.accept = true;
          await acceptProductRepository.update(
            { product_id: pro.product_id, owner_id: pro.owner_id },
            acceptProduct,
          );

          listAccept = listAccept + "|" + pro.product_id;
          // console.log("ListAccept: ", listAccept)
        } catch (error) {
          listError = listError + "|" + pro.product_id;
        }
      }
    }
    catch {
      return res.status(401).json({ status: "failure", message: "Thông tin lỗi, không thể thực hiện được." })
    }
    return res.status(200).json({ listAccept: listAccept, listError: listError });

  }

  // all products is not accepted -> display admin to accept.
  static getProductNoAccept = async (req: Request, res: Response) => {
    const products = await getRepository(Product).find({
      where: { accept: false, available: true }
    });

    res.status(200).json({ products });
  };


  static getByID = async (req: Request, res: Response) => {
    //we can find id of product in params, ../product/id
    let idProduct = req.params.idProduct;

    // idProduct = +idProduct;

    const productRepository = getRepository(Product);
    try {
      const product = await productRepository.findOneOrFail({
        where: {
          product_id: idProduct
        }
      });

      return res.status(200).json({ status: "success", product: product });
    } catch (error) {
      return res.status(401).json({ status: "failure", message: "Sản phẩm này không tồn tại." });
    }

  }
}

export default APIProduct;