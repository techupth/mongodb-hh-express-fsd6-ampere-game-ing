import { Router } from "express";
import { db } from "../utils/db.js"
import { ObjectId } from "mongodb";

const productRouter = Router();
//Read
productRouter.get("/", async (req, res) => {
    const collection = db.collection("products");
  const products = await collection.find().limit(10).toArray();
  return res.json({ data: products });
});

//Read with ID
productRouter.get("/:productId", async (req, res) => {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.productId);
    const product = await collection.findOne({ _id: productId });
    return res.json({ data: product });
});

//Create
productRouter.post("/", async (req, res) => {
    const collection = db.collection("products");

    const productData = {...req.body};
    const products = await collection.insertOne(productData)

    return res.json({
        message: `Product (${products.insertedId})has been created successfully`          
    });
});

//Update
productRouter.put("/:productId", async (req, res) => {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.productId);
    const newProductData = { ...req.body };
  
    await collection.updateOne({ _id: productId }, { $set: newProductData });
    return res.json({        
        message: `Product (${productId}) has been updated successfully`       
    });
  });

//Delete
productRouter.delete("/:productId", async (req, res) => {
    const collection = db.collection("products");
  const productId = new ObjectId(req.params.productId);
  await collection.deleteOne({ _id: productId });
  return res.json({     
        message: `Product (${productId}) has been deleted successfully`,
  });
});

export default productRouter;
