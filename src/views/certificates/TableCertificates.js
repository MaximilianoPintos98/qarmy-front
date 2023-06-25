import { useEffect } from 'react'
import { useState } from 'react'

import ApiService from '../../services/ApiService'
import ModalEditCertificate from './ModalEditCertificate'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// ** MUI Icons
import TrashCanOutline from 'mdi-material-ui/TrashCanOutline'
import FileDocumentEditOutline from 'mdi-material-ui/FileDocumentEditOutline'
import { Button, Grid, Typography } from '@mui/material'
import ModalCreateCertificate from './ModalCreateCertificate'
import CustomAlert from 'src/layouts/components/alert/CustomAlert'
import Swal from 'sweetalert2'

const TableCertificates = () => {
  const [certificates, setCertificates] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [showAlertError, setShowAlertError] = useState(false)

  const fetchCertificates = async () => {
    try {
      const certificatesData = await ApiService.getCertificates()
      setCertificates(certificatesData)
    } catch (error) {
      setShowAlertError(true)
    }
  }

  const onOpenEdit = rowData => {
    setSelectedRow(rowData)
    setOpenEdit(true)
  }
  const onCloseEdit = () => {
    setSelectedRow(null)
    setOpenEdit(false)
    fetchCertificates()
  }

  const onOpenCreate = () => {
    setOpenCreate(true)
  }
  const onCloseCreate = () => {
    setOpenCreate(false)
    fetchCertificates()
  }

  const onDelete = async certificateId => {
    Swal.fire({
      title: '¿Estas seguro que desea eliminar?',
      text: "Este cambio no podra ser revertido!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then(result => {
      if (result.isConfirmed) {
        ApiService.deleteCertificate(certificateId).then(() => {
          Swal.fire('Eliminado!', 'Su registro fue eliminado con éxito.', 'success')
          fetchCertificates()
        })
      }
    })
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  return (
    <>
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

      <TableContainer component={Paper}>
        <Button
          sx={{ border: '1px solid', margin: '10px' }}
          variant='outlined'
          color='success'
          onClick={() => onOpenCreate()}
        >
          Nuevo
        </Button>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Typography fontWeight={600}>Id</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography fontWeight={600}>Nombre y Apellido</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography fontWeight={600}>dni</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography fontWeight={600}>curso</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography fontWeight={600}>nota</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography fontWeight={600}>Acciones</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.length === 0 ? (
              <TableRow>
                <TableCell>No hay certificados cargados.</TableCell>
              </TableRow>
            ) : (
              certificates.map(certificate => (
                <TableRow key={certificate.id}>
                  <TableCell>{certificate.id}</TableCell>
                  <TableCell component='th' scope='row' align='center'>
                    {certificate.first_name} {certificate.last_name}
                  </TableCell>
                  <TableCell align='center'>{certificate.dni}</TableCell>
                  <TableCell align='center'>{certificate.course}</TableCell>
                  <TableCell align='center'>{certificate.note}</TableCell>
                  <TableCell align='center'>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Button variant='outlined' size='small' color='error' onClick={() => onDelete(certificate.id)}>
                          <TrashCanOutline color='error' />
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant='outlined' size='small' color='info' onClick={() => onOpenEdit(certificate)}>
                          <FileDocumentEditOutline color='info' />
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))
            )}
            <ModalEditCertificate onOpen={openEdit} onClose={onCloseEdit} Certificate={selectedRow} />
            <ModalCreateCertificate onOpen={openCreate} onClose={onCloseCreate} />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableCertificates
