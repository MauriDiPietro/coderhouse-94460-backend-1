import { Router } from "express";
import { userManager } from "../managers/user-manager.js";

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

router.get('/register', (req, res)=>{
  res.render('form')
})

router.get('/home/:id', async(req, res)=>{
  try {
    const { id } = req.params;
    const user = await userManager.getUserById(id);
    res.render('dashboard', { user });
  } catch (error) {
    res.render('error', { error: error.message });
  }
})

export default router;
