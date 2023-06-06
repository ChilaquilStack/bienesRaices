import Usuario from '../models/User.model.js';
import { check, validationResult } from "express-validator";
import sendEmail from '../helpers/sendEmail.js';

const login = ( req, res ) => res.render('auth/login', { 
    titulo: 'Iniciar sesion',
    csrfToken: req.csrfToken()
})

const autenticar = async (req, res) => {
    await check('email').isEmail().withMessage("El email no es valido").run(req)
    await check('password').notEmpty().withMessage("El password no puede estar vacio").run(req)

    const resultado = validationResult(req)

    if(!resultado.isEmpty()) {
        return res.render('auth/login', {
            titulo: 'Iniciar sesion',
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        })
    }
}

const registro = ( req, res ) => {
    res.render('auth/registro', {
        titulo: "Crear cuenta",
        csrfToken: req.csrfToken()
    })
}

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
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
            usuario: {
                nombre,
                email,
                csrfToken: req.csrfToken()
            }
        })
    }

    const existeUsuario = await Usuario.findOne({ where: { email }})

    if(existeUsuario) {
        return res.render('auth/registro', {
            titulo: 'Crear cuenta',
            csrfToken: req.csrfToken(),
            errores: [{ msg: "El usuario ya existe" }],
            usuario: {
                nombre,
                email,
            }
        })
    }

    const usuario = await Usuario.create({
            ...req.body,
            token: Math.random().toString(32).substring(2) + Date.now().toString(32),
    })
        
    sendEmail({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    return res.render('templates/mensaje', {
        titulo: 'Cuenta creada correctamente',
        mensaje: 'Hemos enviado un email de confirmacion, presiona el enlace',
    })
}

const confirmacion = async (req, res) => {
    
    const { token } = req.params;

    const usuario = await Usuario.findOne(({ where: { token } }))

    if(!usuario) {
        return res.render('auth/confirmar', {
            titulo: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        })
    }

    usuario.token = null
    usuario.confirmado = true
    await usuario.save()

    res.render('auth/confirmar', {
        pagina: 'Cuenta confirmada',
        mensaje: 'La cuenta se confirmo correctamente'
    })

}

const resetForm = ( req, res ) => res.render('auth/reset', {
    titulo: "Recupera tu password",
    csrfToken: req.csrfToken(),
})

const reset = async (req, res) => {
    await check('email').isEmail().withMessage("El email no es valido").run(req)

    const resultado = validationResult(req);

    if(!resultado.isEmpty()) {
        return res.render('auth/reset', {
            titulo: "Recupera tu password",
            csrfToken: req.csrfToken(),
            errores: resultado.array(),
        })
    }

    const { email } = req.body

    const usuario = await Usuario.findOne({where: { email }})

    if(!usuario) {
        return res.render('auth/reset', {
            titulo: "Recupera tu password",
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El email no pertenece a ningun usuario'}]
        })
    }
}

export {
    login, registro, reset, registrar, confirmacion, resetForm, autenticar
}