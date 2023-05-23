const login = ( req, res ) => res.render('auth/login', { autenticado: true })

const registro = ( req, res ) => res.render('auth/registro')

export {
    login, registro
}