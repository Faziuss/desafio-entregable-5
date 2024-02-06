import { Router } from "express";
import { products } from "../app.js";

const router = Router();

router.get("/", (req, res) => {
    return res.render("home", {products});
  });

export default router;