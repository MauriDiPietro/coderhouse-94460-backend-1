import { Router } from "express";

const router = Router();

const user = {
    nombre: "Juan",
    apellido: "Pérez",
}

const users = [
    // { nombre: "Ana", edad: 28 },
    // { nombre: "Luis", edad: 34 },
    // { nombre: "María", edad: 22 },
]

router.get("/vista1", (req, res) => {
  res.render("view1");
})

router.get("/vista2", (req, res) => {
  res.render("view2", { user });
})

router.get("/vista3", (req, res) => {
  res.render("view3", { users });
})

export default router;
