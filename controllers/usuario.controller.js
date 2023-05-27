import Usuario from '../models/User.model.js';
import { check, validationResult } from "express-validator";

const login = ( req, res ) => res.render('auth/login', { 
    titulo: 'Iniciar sesion' 
})

const registro = ( req, res ) => res.render('auth/registro', {
    titulo: "Crear cuenta"
})

const registrar = async ( req, res ) => {

    await check('nombre').notEmpty().withMessage("El nombre no puede estar vacio").run(req)
    await check('email').isEmail().withMessage("El email no es valido").run(req)
    await check('password').isLength({ min:6 }).withMessage("El password debe ser de minimo 6 caracteres").run(req)
    await check('repetir_password').equals(req.body.password).withMessage("Los passwords no son iguales").run(req)

    const resultado = validationResult(req)


    const { nombre, email } = req.body
    
    if(!resultado.isEmpty()) {
        return res.render('auth/registro', {
            titulo: 'Crear cuenta',
            errores: resultado.array(),
            usuario: {
                nombre,
                email,
            }
        })
    }

    const existeUsuario = await Usuario.findOne({ where: { email }})

    if(existeUsuario) {
        return res.render('auth/registro', {
            titulo: 'Crear cuenta',
            errores: [{ msg: "El usuario ya existe" }],
            usuario: {
                nombre,
                email,
            }
        })
    }

    try {
        const usuario = await Usuario.create(req.body)
        return res.render('auth/registro', {
            titulo: 'Crear cuenta',
            usuario
        })
    } catch (error) {
        console.error("Usuario no creado: ", error)
    }
}

const reset = ( req, res ) => res.render('auth/reset', {
    titulo: "Recupera tu password"
})

export {
    login, registro, reset, registrar
}