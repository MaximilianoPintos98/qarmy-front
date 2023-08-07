import { useState, useEffect } from 'react'
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box
} from '@mui/material'
import { format } from 'date-fns'
import Swal from 'sweetalert2'
import ApiService from '../../services/ApiService'
import CustomAlert from 'src/layouts/components/alert/CustomAlert'
import FileDocumentEditOutline from 'mdi-material-ui/FileDocumentEditOutline'
import ModalCreateCertificate from './ModalCreateCertificate'
import ModalEditCertificate from './ModalEditCertificate'
import PaginationComponent from '../pagination/Pagination'
import SearchComponent from '../search-bar/SearchBar'
import TrashCanOutline from 'mdi-material-ui/TrashCanOutline'

const TableCertificates = () => {
  const pageSizeOptions = [5, 10, 20, 50, 100]

  const defaultSearchValues = {
    first_name: '',
    last_name: '',
    license: '',
    course: '',
    note: '',
    date: ''
  }
  
  const [certificates, setCertificates] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openCreate, setOpenCreate] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [showAlertError, setShowAlertError] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [searchValues, setSearchValues] = useState(defaultSearchValues)

  const fetchCertificates = async () => {
    try {
      const response = await ApiService.getCertificates({
        page: currentPage,
        pageSize,
        ...searchValues
      })

      setCertificates(response.data.reverse())
      setTotalPages(response.totalPages)
      setTotalCount(response.totalCount)
    } catch (error) {
      setShowAlertError(true)
    }
  }

  const handlePageChange = page => {
    setCurrentPage(page)
    fetchCertificates()
  }

  const handlePageSizeChange = event => {
    const newSize = parseInt(event.target.value)
    setPageSize(newSize)
    setCurrentPage(1)
  }

  const handleSearchChange = event => {
    const { name, value } = event.target
    setSearchValues(prevState => ({
      ...prevState,
      [name]: value
    }))
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
    setSearchValues(defaultSearchValues)
    setCurrentPage(1)
  }

  const onCloseCreate = () => {
    setOpenCreate(false)
    setSearchValues(defaultSearchValues)
    setCurrentPage(1)
    fetchCertificates()
  }

  const onDelete = async certificateId => {
    Swal.fire({
      title: '¿Estas seguro que desea eliminar?',
      text: 'Este cambio no podra ser revertido!',
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
  }, [pageSize, currentPage, searchValues])

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
        <Grid container spacing={2} justifyContent='space-between' alignItems='center'>
          <Grid item xs={12} sm={3}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Button
                sx={{ border: '1px solid', margin: '10px' }}
                variant='outlined'
                color='success'
                onClick={onOpenCreate}
              >
                Nuevo
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={7}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SearchComponent searchValues={searchValues} handleSearchChange={handleSearchChange} />
            </Box>
          </Grid>
        </Grid>

        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Typography fontWeight={600}>Matricula</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography fontWeight={600}>Nombre y Apellido</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography fontWeight={600}>Dni</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography fontWeight={600}>Fecha</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography fontWeight={600}>Curso</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography fontWeight={600}>Nota</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography fontWeight={600}>Acciones</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.length === 0 ? (
              <TableRow>
                <TableCell>No se encontraron certificados.</TableCell>
              </TableRow>
            ) : (
              certificates.map(certificate => (
                <TableRow key={certificate.id}>
                  <TableCell align='center'>{certificate.license}</TableCell>
                  <TableCell align='center'>
                    {certificate.first_name} {certificate.last_name}
                  </TableCell>
                  <TableCell align='center'>{certificate.dni}</TableCell>
                  <TableCell align='center'>{format(new Date(certificate.date), 'dd-MM-yyyy')}</TableCell>
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
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationComponent
        currentPage={currentPage}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        totalPages={totalPages}
        totalCount={totalCount}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
      <ModalEditCertificate onOpen={openEdit} onClose={onCloseEdit} Certificate={selectedRow} />
      <ModalCreateCertificate onOpen={openCreate} onClose={onCloseCreate} />
    </>
  )
}

export default TableCertificates
