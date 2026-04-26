/**
 * Middleware que protege rutas de vistas comprobando si hay sesión activa.
 * Redirige a /login si el usuario no está autenticado.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const requireSession = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  next()
}

/**
 * Middleware que permite el acceso a vistas solo a usuarios con rol 'admin'.
 * Debe usarse después de requireSession.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const requireAdminSession = (req, res, next) => {
  if (req.session.user?.rol !== 'admin') {
    return res.status(403).send('No autorizado')
  }
  next()
}
