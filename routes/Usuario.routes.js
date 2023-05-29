import { Router } from "express";
import { confirmacion, login, registrar, registro, reset } from "../controllers/usuario.controller.js";

const router = Router()

router.route("/login").get(login)
    
router.route("/registro").get(registro).post(registrar)

router.route("/reset").get(reset)

router.route("/confirmar/:token").get(confirmacion)

export default router