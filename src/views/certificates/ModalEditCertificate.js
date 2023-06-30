import { useState, useEffect } from 'react'

import ApiService from 'src/services/ApiService'
import CustomAlert from 'src/layouts/components/alert/CustomAlert'

// MUI Imports
import { Box, Button, Grid, Modal, TextField } from '@mui/material'
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

const ModalEditCertificate = ({ onOpen, onClose, Certificate }) => {
  const [showAlertSuccess, setShowAlertSuccess] = useState(false)
  const [showAlertError, setShowAlertError] = useState(false)
  const [formData, setFormData] = useState(null)
  const [selectedDate, setSelectedDate] = useState(formData?.date)

  useEffect(() => {
    setFormData(Certificate)
  }, [Certificate])

  const onChange = event => {
    const { name, value } = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleDateChange = date => {
    setSelectedDate(date)
    setFormData(prevFormData => ({
      ...prevFormData,
      date: date ? date.toISOString() : ''
    }))
  }

  const onEdit = () => {
    ApiService.updateCertificate(formData.id, formData)
      .then(() => {
        setShowAlertSuccess(true);
        onClose()
      })
      .catch(() => {
        setShowAlertError(true);
      });
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {showAlertSuccess && (
          <CustomAlert
            type='success'
            message='Registro editado con éxito.'
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

        {Certificate ? (
          <Modal open={onOpen} onClose={onClose}>
            <Box sx={style}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid item xs={6}>
                  <TextField
                    onChange={onChange}
                    fullWidth
                    name='license'
                    label='Matricula'
                    variant='outlined'
                    value={formData?.license || ''}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={onChange}
                    fullWidth
                    name='dni'
                    label='Dni'
                    variant='outlined'
                    value={formData?.dni || ''}
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
                <Grid item xs={6}>
                  <TextField
                    onChange={onChange}
                    fullWidth
                    name='course'
                    label='Curso'
                    variant='outlined'
                    value={formData?.course || ''}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={onChange}
                    fullWidth
                    name='note'
                    label='Nota'
                    variant='outlined'
                    value={formData?.note || ''}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={onChange}
                    fullWidth
                    name='first_name'
                    label='Nombre'
                    variant='outlined'
                    value={formData?.first_name || ''}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={onChange}
                    fullWidth
                    name='last_name'
                    label='Apellido'
                    variant='outlined'
                    value={formData?.last_name || ''}
                  />
                </Grid>
                <Grid item xs={12} display={'flex'} sx={{ justifyContent: 'end' }}>
                  <Button onClick={onEdit} sx={{ border: '1px solid' }}>
                    Guardar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        ) : null}
      </LocalizationProvider>
    </>
  )
}

export default ModalEditCertificate
