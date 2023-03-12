import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entities/Product";

class APIProduct {
  static add = async (req: Request, res: Response) => {
    //product_id	owner_id	sale_price	name	detail	stock
    //original_price	image_link	average_rate	sold_amount	type	commentor_id	available
    let {
      // product_id,
      owner_id,
      sale_price,
      name,
      detail,
      stock,
      original_price,
      image_link,
      average_rate,
      sold_amount,
      type,
    } = req.body;



    let newProduct = new Product();
    // newProduct.product_id = product_id; mới kiểm tra trong pgAdmin thì thấy nó set tự động tăng -> không cần điền
    newProduct.owner_id = owner_id;
    newProduct.sale_price = sale_price;
    newProduct.name = name;
    newProduct.detail = detail;
    newProduct.stock = stock;
    newProduct.original_price = original_price;
    newProduct.image_link = image_link;
    newProduct.average_rate = average_rate || 0;
    newProduct.sol_amount = sold_amount || 1;
    newProduct.type = type ;
    newProduct.available = true;  
    newProduct.accept = true;  

    console.log("NewProduct: ", newProduct);
    
    const productRepository = await getRepository(Product);
    try {
        await productRepository.save(newProduct);

    } catch (error) {
      return res.send(error);
    }
    res.status(201).send("Added product.");
  };

  static test = async (req: Request, res: Response) => {
    res.send ("It's okay!");
  }

  static update = async (req: Request, res: Response) => {
    //get info what seller want to update
    let {
      product_id,
      owner_id,
      sale_price,
      name,
      detail,
      stock,
      original_price,
      image_link,
      average_rate,
      sold_amount,
      type,
      available,
      accept
      
    } = req.body;

    //covert type 
    product_id = +product_id;

    if(typeof available === "string") {
      available = JSON.parse(available);
    }
    if(typeof accept === "string") {
      accept = JSON.parse(accept);
    }

    const updateProductRepository = await getRepository(Product);
    
    try {
      const product = await updateProductRepository.findOneOrFail({
        where: { product_id },
      });
      
      //set property if it is defined
      if(owner_id) {product.owner_id = owner_id};
      if(sale_price) {product.sale_price = sale_price};
      if(name) {product.name = name};
      if(detail) {product.detail = detail};
      if(stock) {product.owner_id = owner_id};
      if(original_price) {product.original_price = original_price};
      if(image_link) {product.image_link = image_link};
      if(average_rate) {product.average_rate = average_rate};
      if(sold_amount) {product.sol_amount = sold_amount};
      if(type) {product.type = type};
      if(typeof available === "boolean") {product.available = available};
      if(typeof accept === "boolean") {product.accept = accept};

      // console.log("updated product: ", product);
      // save updated product 
      await updateProductRepository.save(product);
      return  res.status(201).send("Updated product.");
    } catch (error) {
      console.log(error); 
      return res.status(404).send("product is not found.");
    }

  }

  static delete = async (req: Request, res: Response) => {
    let {product_id, owner_id} = req.body;

    const deleteProductRepository = getRepository(Product);

    try {
      const product = await deleteProductRepository.findOneOrFail({
        where: { product_id, owner_id },
      });
      await deleteProductRepository.delete(product);
      return  res.status(201).send("Deleted product.");
    } catch (error) {
      return res.status(404).send("product is not found.");
    }
  }
}

export default  APIProduct;