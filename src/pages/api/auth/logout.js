import { serialize } from 'cookie'
import { verify } from 'jsonwebtoken'

export default function logoutHandler(req, res) {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({ error: 'no token' })
  }

  try {
    verify(token, process.env.KEY)

    const serialized = serialize('token', null, {
      httpOnly: true,
      maxAge: 0,
      path: '/'
    })

    res.setHeader('Set-Cookie', serialized)
    res.status(200).json('logout successfully')
  } catch (error) {
    return res.status(401).json({ error: 'invalid token' })
  }
}
