import { Router } from "express";
import { products } from "../app.js";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/", (req, res) => {
  return res.render("realTimeProducts", { products });
});

router.post("/add", (req, res) => {
  try {
    const io = req.app.get("io");
    const newProd = req.body;

    const allowedFields = ["name", "stock", "description"];
    const fields = Object.keys(newProd);
    const disallowedFields = fields.filter(
      (field) => !allowedFields.includes(field)
    );

    if (disallowedFields.length > 0) {
      return res.status(400).json({
        error: `Los siguientes campos NO estan permitidos: ${disallowedFields.join(
          ", "
        )}`,
      });
    }

    if (!newProd.name || !newProd.description || !newProd.stock) {
      return res.status(400).json({
        error: "Los campos name, description y stock SON OBLIGATORIOS",
      });
    }

    if (
      typeof newProd.name !== "string" ||
      typeof newProd.description !== "string" ||
      isNaN(newProd.stock)
    ) {
      return res.status(400).send({
        error: "Algunos campos tienen un dato invalido",
      });
    }

    newProd.id = uuidv4();

    products.push(newProd);
    io.emit("newProduct", newProd);
    return res.send({
      status: "sucess",
      message: "Producto agregado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
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
