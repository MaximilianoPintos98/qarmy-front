import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

export default function loginHandler(req, res) {
  const { email, password } = req.body

  if (email === process.env.EMAIL && password === process.env.PASSWORD) {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        first_name: 'Danilo',
        last_name: 'Vezzoni'
      },
      process.env.KEY
    )

    const serialized = serialize('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/'
    })

    res.setHeader('Set-Cookie', serialized)

    return res.json('login succesfully')
  }

  return res.status(401).json({error: 'invalid email or password'})
}
