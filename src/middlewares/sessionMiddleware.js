export const requireSession = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  next()
}

export const requireAdminSession = (req, res, next) => {
  if (req.session.user?.rol !== 'admin') {
    return res.status(403).send('No autorizado')
  }
  next()
}