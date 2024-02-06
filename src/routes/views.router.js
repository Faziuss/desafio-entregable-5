import { Router } from "express";
import { products } from "../app.js";

const router = Router();

router.get("/", (req, res) => {
  return res.render("realTimeProducts", {products});
});

router.post("/add", (req, res) => {
  const io = req.app.get("io");

  const newProd = req.body;

  products.push(newProd);  
  io.emit("newProduct", newProd)
  res.send("Producto agregado correctamente");
}); 

/* 
router.delete("/remove", (req,res)=> {
    
}) */

export default router;
