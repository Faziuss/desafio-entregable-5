import { Router } from "express";
import { products } from "../app.js";

const router = Router();

router.get("/", (req, res) => {
  return res.render("realTimeProducts", { products });
});

router.post("/add", (req, res) => {
  const io = req.app.get("io");

  const newProd = req.body;

  products.push(newProd);
  io.emit("newProduct", newProd);
  res.send("Producto agregado correctamente");
});

router.delete("/remove/:pid", (req, res) => {
  const io = req.app.get("io");
  const { pid } = req.params;

  const i = products.findIndex((p) => p.id == pid);

  if (i === -1) {
    return res.status(400).send({
      error: "La id que ingresaste no existe",
    });
  }

  products.splice(i, 1);
  io.emit("deleteProduct", pid);

  res.send("Producto Eliminado con exito");
});

export default router;
