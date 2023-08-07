import { useState } from 'react'

import ApiService from 'src/services/ApiService'
import CustomAlert from 'src/layouts/components/alert/CustomAlert'
import Swal from 'sweetalert2'

// MUI Imports
import { Box, Button, Grid, Modal, TextField, TextareaAutosize } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid',
  boxShadow: 24,
  p: 4
}

const ModalCreateCertificate = ({ onOpen, onClose }) => {
  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  const [showAlertError, setShowAlertError] = useState(false)

  const [formData, setFormData] = useState({
    dni: '',
    course: '',
    note: '',
    first_name: '',
    last_name: '',
    date: '',
    license: '',
    description: ''
  })

  const [formErrors, setFormErrors] = useState({
    license: false,
    dni: false,
    course: false,
    note: false,
    first_name: false,
    last_name: false,
    date: false,
    description: false
  })

  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateChange = date => {
    setSelectedDate(date)
    setFormData(prevFormData => ({
      ...prevFormData,
      date: date ? date.toISOString() : ''
    }))
  }

  const onChange = event => {
    const { name, value } = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const onFocus = fieldName => {
    setFormErrors(prevFormErrors => ({
      ...prevFormErrors,
      [fieldName]: false
    }))
  }

  const onCreate = () => {
    const errors = {}

    if (formData.date === '') {
      Swal.fire({
        text: 'Campo fecha es requerido',
        icon: 'error',
        position: 'center',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        customClass: {
          container: 'swal-popup-container'
        }
      })
    }

    Object.keys(formData).forEach(key => {
      if (formData[key] === '') {
        errors[key] = true
      }
    })

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      
      return
    }

    ApiService.createCertificate(formData)
      .then(() => {
        setShowAlertSuccess(true)
        onClose()
      })
      .catch(error => {
        setShowAlertError(true)
      })
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {showAlertSuccess && (
          <CustomAlert
            type='success'
            message='Registro guardado con exito.'
            position='top-end'
            timer={2000}
            showConfirmButton={false}
            toast={true}
          />
        )}
        {showAlertError && (
          <CustomAlert
            type='error'
            message='Datos con errores.'
            position='top-end'
            timer={2000}
            showConfirmButton={false}
            toast={true}
          />
        )}
        <Modal open={onOpen} onClose={onClose}>
          <Box sx={style}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid item xs={6}>
                <TextField
                  onChange={onChange}
                  onFocus={() => onFocus('license')}
                  fullWidth
                  name='license'
                  label='Matricula'
                  variant='outlined'
                  error={formErrors.course}
                  helperText={formErrors.course && 'Este campo es requerido.'}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={onChange}
                  onFocus={() => onFocus('course')}
                  fullWidth
                  name='course'
                  label='Curso'
                  variant='outlined'
                  error={formErrors.course}
                  helperText={formErrors.course && 'Este campo es requerido.'}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={onChange}
                  onFocus={() => onFocus('note')}
                  fullWidth
                  name='note'
                  label='Nota'
                  variant='outlined'
                  error={formErrors.note}
                  helperText={formErrors.note && 'Este campo es requerido.'}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={onChange}
                  onFocus={() => onFocus('first_name')}
                  fullWidth
                  name='first_name'
                  label='Nombre'
                  variant='outlined'
                  error={formErrors.first_name}
                  helperText={formErrors.first_name && 'Este campo es requerido.'}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={onChange}
                  onFocus={() => onFocus('last_name')}
                  fullWidth
                  name='last_name'
                  label='Apellido'
                  variant='outlined'
                  error={formErrors.last_name}
                  helperText={formErrors.last_name && 'Este campo es requerido.'}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={onChange}
                  onFocus={() => onFocus('dni')}
                  fullWidth
                  name='dni'
                  label='Dni'
                  variant='outlined'
                  error={formErrors.dni}
                  helperText={formErrors.dni && 'Este campo es requerido.'}
                />
              </Grid>
              <Grid item xs={6}>
                <DesktopDatePicker
                  label='Fecha'
                  inputFormat='dd/MM/yyyy'
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={params => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={onChange}
                  onFocus={() => onFocus('description')}
                  fullWidth
                  multiline
                  name='description'
                  label='Descripcion'
                  variant='outlined'
                  error={formErrors.description}
                  helperText={formErrors.description && 'Este campo es requerido.'}
                />
              </Grid>
              <Grid item xs={12} display={'flex'} sx={{ justifyContent: 'end' }}>
                <Button onClick={onCreate} sx={{ border: '1px solid' }}>
                  Crear
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </LocalizationProvider>
    </>
  )
}

export default ModalCreateCertificate
