const login = ( req, res ) => res.render('auth/login', { autenticado: true })

const registro = ( req, res ) => res.render('auth/registro', {
    titulo: "Crear cuenta"
})

export {
    login, registro
}