import { useEffect, useState } from 'react'

import ApiService from 'src/services/ApiService'

import Magnify from 'mdi-material-ui/Magnify'
import { useTheme } from '@mui/material/styles'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography, 
  Grid
} from '@mui/material'
import CustomAlert from 'src/layouts/components/alert/CustomAlert'
import { CertificateOutline } from 'mdi-material-ui'
import { format } from 'date-fns'


const Dashboard = () => {
  const [inputValue, setInputValue] = useState('')
  const [certificate, setCertificate] = useState(null)
  const [showAlertError, setShowAlertError] = useState(false)
  const [showAlertNotFound, setShowAlertNotFound] = useState(false)
  const theme = useTheme()
  const isLightTheme = theme.palette.mode === 'light'

  useEffect(() => {
    setShowAlertError(false)
    setShowAlertNotFound(false)
  }, [showAlertError, showAlertNotFound])

  const handleInputChange = event => {
    setInputValue(event.target.value)
  }

  const handleValidation = async () => {
    try {
      if (inputValue === '') {
        setShowAlertError(true)
        setCertificate(null)
        return
      }

      const response = await ApiService.getCertificate(inputValue)
      console.log(response)
      if (response.data.data[0] === undefined) {
        setShowAlertNotFound(true)
        return
      }

      setCertificate(response.data.data[0])
      setShowAlertError(false)
      setShowAlertNotFound(false)
      setInputValue('')
    } catch (error) {
      setShowAlertError(true)
      setCertificate(null)
    }
  }

  return (
    <>
      {showAlertError && (
        <CustomAlert
          type='error'
          message='Debe ingresar una matricula.'
          position='center'
          showConfirmButton={true}
          toast={false}
        />
      )}
      <Card sx={{ border: '1px solid', boxShadow: '0px 0px 15px 0px' }}>
        <CardContent>
          <Box textAlign='center'>
            <CardMedia
              component='img'
              sx={{
                width: '10%',
                margin: 'auto',
                paddingBottom: '10px',
                filter: isLightTheme ? 'invert(100%)' : 'none'
              }}
              image='./images/underc0de-logo.png'
              alt='Logo Underc0de'
            />
            <Typography gutterBottom variant='h5' component='div'>
              Validación de certificados Underc0de
            </Typography>
            <Typography variant='body1' sx={{ paddingBottom: '10px' }}>
              El Sistema de Validación de Certificados (SVC) de Underc0de permite la validación de autenticidad de los
              certificados emitidos por Underc0de de la Provincia de Mendoza. El SVC permite corroborar la veracidad de
              la información brindada por una persona respecto a su certificación académica. Dicho SVC puede ser
              utilizado tanto por el alumno en cuestión, como por un tercero que manifieste la necesidad de validar el
              historial académico de una persona. Todos los certificados emitidos poseen un Código Único de Validación
              (CUV). Al ingresar el CUV en el SVC le indica: Nombre, Apellido y DNI del alumno, además de lainformación
              académica asociada a ese certificado: Curso, Calificación, Fecha de Cursada. <br />
              <strong>
                Recomendamos a todos nuestros alumnos que incorporen los cursos realizados en el Centro de e-Learning en
                su Curriculum Vitae, adicionar junto al nombre del curso el CUV. Para validar un certificado, por favor,
                ingrese el código (CUV) en el siguiente cuadro y luego presione "Validar"
              </strong>
            </Typography>
            <TextField
              size='small'
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4, margin: '20px' } }}
              value={inputValue}
              onChange={handleInputChange}
              autoComplete='off'
              InputProps={{
                placeholder: 'Matricula..',
                startAdornment: (
                  <InputAdornment position='start'>
                    <Magnify fontSize='small' />
                  </InputAdornment>
                )
              }}
            />
            <Button
              sx={{ border: '1px solid', margin: '20px' }}
              variant='contained'
              color='success'
              onClick={handleValidation}
            >
              Validar
            </Button>
            {certificate ? (
              <List
                sx={{
                  width: '100%',
                  maxWidth: 360,
                  bgcolor: 'background.paper',
                  margin: 'auto',
                  border: '1px solid',
                  borderRadius: '4px',
                  borderColor: '#ccc',
                  boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.1)'
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <CertificateOutline />
                    </Avatar>
                  </ListItemAvatar>
                  <Grid container direction='column'>
                    <Grid item>
                      <ListItemText primary='Matricula' secondary={certificate.license} />
                    </Grid>
                    <Grid item>
                      <ListItemText primary='Fecha' secondary={format(new Date(certificate.date), 'dd-MM-yyyy')} />
                    </Grid>
                    <Grid item>
                      <ListItemText primary='Nombre y Apellido' secondary={certificate.first_name + ' ' + certificate.last_name} />
                    </Grid>
                    <Grid item>
                      <ListItemText primary='Curso' secondary={certificate.course} />
                    </Grid>
                    <Grid item>
                      <ListItemText primary='Nota' secondary={certificate.note} />
                    </Grid>
                    <Grid item>
                      <ListItemText primary='Dni' secondary={certificate.dni} />
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            ) : showAlertNotFound ? (
              <CustomAlert
                type='error'
                message='Matricula no encontrada.'
                position='center'
                showConfirmButton={true}
                toast={false}
              />
            ) : null}
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default Dashboard
