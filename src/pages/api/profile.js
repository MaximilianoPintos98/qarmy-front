import { verify } from 'jsonwebtoken'

export default function profileHandler(req, res) {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({ error: 'no token' })
  }
  
  const user = verify(token, process.env.KEY)

  return res.status(200).json({ first_name: user.first_name, last_name: user.last_name })
}
