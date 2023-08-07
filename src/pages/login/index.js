// ** React Imports
import { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'
import axios from 'axios'
import Swal from 'sweetalert2'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    showPassword: false
  })

  const router = useRouter()

  const handleChange = e => {
    setCredentials({ 
      ...credentials,
      [e.target.name]: e.target.value 
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (credentials.email === '' && credentials.password === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email o Contraseña Vacios',
      })
    }

    await axios.post('/api/auth/login', credentials)
      .then((response) => {
        if (response.status === 200) {
          router.push('/certificates')
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.error,
        })
      })
  }

  const handleHome = () => {
    router.push('/')
  }

  const handleClickShowPassword = () => {
    setCredentials({ ...credentials, showPassword: !credentials.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
    console.log(event)
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Bienvenido a {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Inicia sesión para poder ingresar al panel de admin.</Typography>
          </Box>
          <form autoComplete='off' onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <TextField
                autoFocus
                label='Email'
                name='email'
                sx={{ marginBottom: 4 }}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Contraseña</InputLabel>
              <OutlinedInput
                label='Password'
                name='password'
                onChange={handleChange}
                type={credentials.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {credentials.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            ></Box>
            <Button type='submit' fullWidth size='large' variant='contained' sx={{ marginBottom: 3 }}>
              Ingresar
            </Button>
            <Divider sx={{ my: 3 }}></Divider>
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} onClick={handleHome}>
              Home
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
