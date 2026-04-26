import jwt from 'jsonwebtoken'

/**
 * Middleware que verifica el token JWT del header Authorization.
 * Si es válido, adjunta el payload decodificado en req.user.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const verifyToken = (req, res, next) => {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' })
  }

  const token = header.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ error: 'Token inválido' })
  }
}

/**
 * Middleware que permite el acceso solo a usuarios con rol 'admin'.
 * Debe usarse después de verifyToken.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const requireAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ error: 'Solo admin' })
  }
  next()
}
