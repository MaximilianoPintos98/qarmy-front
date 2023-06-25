import { useState } from 'react'

import ApiService from 'src/services/ApiService'
import CustomAlert from 'src/layouts/components/alert/CustomAlert'

// MUI Imports
import { Box, Button, Grid, Modal, TextField } from '@mui/material'

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
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  
  const [formData, setFormData] = useState({
    dni: '',
    course: '',
    note: '',
    first_name: '',
    last_name: ''
  });

  const [formErrors, setFormErrors] = useState({
    dni: false,
    course: false,
    note: false,
    first_name: false,
    last_name: false
  });


  const onChange = event => {
    const { name, value } = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const onFocus = (fieldName) => {
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [fieldName]: false
    }));
  };

  const onCreate = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === '') {
        errors[key] = true;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    ApiService.createCertificate(formData)
      .then(() => {
        setShowAlertSuccess(true);
        onClose()
      })
      .catch((error) => {
        setShowAlertError(true);
      });
  }

  return (
    <>
      {showAlertSuccess && <CustomAlert type='success' message='Registro guardado con exito.' position='top-end' timer={2000} showConfirmButton={false} toast={true} />}
      {showAlertError && <CustomAlert type='error' message='Datos con errores.' position='top-end' timer={2000} showConfirmButton={false} toast={true} />}
      <Modal open={onOpen} onClose={onClose} >
        <Box sx={style} >
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={6}>
              <TextField onChange={onChange} onFocus={() => onFocus('course')} fullWidth name='course' label='Curso' variant='outlined' error={formErrors.course} helperText={formErrors.course && 'Este campo es requerido.'}/>
            </Grid>
            <Grid item xs={6}>
              <TextField onChange={onChange} onFocus={() => onFocus('note')} fullWidth name='note' label='Nota' variant='outlined' error={formErrors.note} helperText={formErrors.note && 'Este campo es requerido.'}/>
            </Grid>
            <Grid item xs={6}>
              <TextField onChange={onChange} onFocus={() => onFocus('first_name')} fullWidth name='first_name' label='Nombre' variant='outlined' error={formErrors.first_name} helperText={formErrors.first_name && 'Este campo es requerido.'}/>
            </Grid>
            <Grid item xs={6}>
              <TextField onChange={onChange} onFocus={() => onFocus('last_name')} fullWidth name='last_name' label='Apellido' variant='outlined' error={formErrors.last_name} helperText={formErrors.last_name && 'Este campo es requerido.'}/>
            </Grid>
            <Grid item xs={6}>
              <TextField onChange={onChange} onFocus={() => onFocus('dni')} fullWidth name='dni' label='Fecha' variant='outlined' error={formErrors.dni} helperText={formErrors.dni && 'Este campo es requerido.'}/>
            </Grid>
            <Grid item xs={12} display={'flex'} sx={{ justifyContent: 'end' }}>
              <Button onClick={onCreate} sx={{ border: '1px solid' }}>
                Crear
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

    </>
  )
}

export default ModalCreateCertificate
