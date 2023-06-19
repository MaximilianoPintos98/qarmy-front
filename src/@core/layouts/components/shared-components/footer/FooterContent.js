import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

const FooterContent = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'end' }}>
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}, Developed by `}
        <Link target='_blank' sx={{ color: 'red' }} href='https://www.linkedin.com/in/maximiliano-pintos98/'>
          MP
        </Link>,
        {` distribute by `}
        <Link target='_blank' href='https://underc0de.org/' sx={{ color: 'red' }}>
          Underc0de
        </Link>
      </Typography>
    </Box>
  )
}

export default FooterContent
