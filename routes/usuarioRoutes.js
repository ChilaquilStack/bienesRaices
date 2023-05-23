import { Router } from "express";
import { login, registro } from "../controllers/usuario.controller.js";

const router = Router()

router.route("/login").get(login)
    
router.route("/registro").get(registro)

export default router