const login = ( req, res ) => res.render('auth/login', { 
    titulo: 'Iniciar sesion' 
})

const registro = ( req, res ) => res.render('auth/registro', {
    titulo: "Crear cuenta"
})

const reset = ( req, res ) => res.render('auth/reset', {
    titulo: "Recupera tu password"
})

export {
    login, registro, reset
}