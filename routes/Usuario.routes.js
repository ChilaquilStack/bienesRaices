import { Router } from "express";
import { confirmacion, login, registrar, registro, reset, resetForm, autenticar } from "../controllers/usuario.controller.js";

const router = Router()

router.route("/login").get(login).post(autenticar)
    
router.route("/registro").get(registro).post(registrar)

router.route("/reset").get(resetForm).post(reset)

router.route("/confirmar/:token").get(confirmacion)

export default router