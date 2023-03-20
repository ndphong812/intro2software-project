import { Request, Response } from "express";
import { getRepository, getManager  } from "typeorm";
import { Product } from "../entities/Product";
import { In } from "typeorm";

class APIProduct {
  static add = async (req: Request, res: Response) => {

    const newProduct: Partial<Product> = req.body;

    newProduct.available = true;
    newProduct.accept = true;

    if (typeof newProduct.average_rate !== "string") {
      newProduct.average_rate = 0;
    }

    if (typeof newProduct.sold_amount !== "string") {
      newProduct.sold_amount = 0;
    }

    // console.log("NewProduct: ", newProduct);

    const productRepository = await getRepository(Product);
    try {
      await productRepository.save(newProduct);
      return res.status(200).json({ status: "success", message: "Added product." });
    } catch (error) {
      return res.status(401).json({ status: "failure", message: error });
    }

  };

  static update = async (req: Request, res: Response) => {

    const newValues: Partial<Product> = req.body;

    // console.log("newvalues: ", newValues);

    if (typeof newValues.available === "string") {
      newValues.available = JSON.parse(newValues.available);
    }
    if (typeof newValues.accept === "string") {
      newValues.accept = JSON.parse(newValues.accept);
    }

    const updateProductRepository = await getRepository(Product);

    const result = await updateProductRepository.update(
      { product_id: newValues.product_id, owner_id: newValues.owner_id },
      newValues,
    );
    if (result.affected === 0) {
      return res.status(401).json({ status: "failure", message: "product is not found." });
    } else {
      return res.status(200).json({ status: "success", message: "Updated product." });
    }


  }

  static delete = async (req: Request, res: Response) => {
    let { product_id, owner_id } = req.body;

    // console.log("owner_id_delete: ", owner_id);

    const deleteProductRepository = getRepository(Product);

    try {
      //check undefined
      if (product_id && owner_id) {
        let product = new Product();
        product = await deleteProductRepository.findOneOrFail({
          where: { product_id: product_id, owner_id: owner_id },
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

  static search = async (req: Request, res: Response) => {
    const { name } = req.body;
    console.log("name: ", name);
    const productRepository = getRepository(Product);
    try {

      let products: Product[];
      products = await productRepository.find({ where: { brand: name } });
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

  static getAll = async (req: Request, res: Response) => {
    const entityManager = getManager();
    const products = await entityManager.find(Product);

    res.status(200).json({products});
  }

  static getByID = async (req: Request, res: Response) => {
    //we can find id of product in params, ../product/id
    let idProduct = req.params.idProduct;

    // idProduct = +idProduct;

    const productRepository = getRepository(Product);
    try {
          const product = await productRepository.findOne({
      where: {
        product_id: idProduct
      }
    });
    
    return res.status(200).json({product});
    } catch (error) {
      return res.status(401).json({ status: "failure", message: "ID product is wrong" });
    }

  }
}

export default APIProduct;