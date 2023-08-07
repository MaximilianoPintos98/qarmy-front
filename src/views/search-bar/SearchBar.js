import { Grid, TextField } from '@mui/material'

const SearchComponent = ({ searchValues, handleSearchChange }) => {
  return (
    <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid item xs={2} sx={{ margin: '10px' }}>
        <TextField
          size='small'
          label='Nombre'
          name='first_name'
          value={searchValues?.first_name}
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid item xs={2} sx={{ margin: '10px' }}>
        <TextField
          size='small'
          label='Apellido'
          name='last_name'
          value={searchValues?.last_name}
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid item xs={2} sx={{ margin: '10px' }}>
        <TextField
          size='small'
          label='Matricula'
          name='license'
          value={searchValues?.license}
          onChange={handleSearchChange}
        />
      </Grid>
      <Grid item xs={2} sx={{ margin: '10px' }}>
        <TextField size='small' label='Curso' name='course' value={searchValues?.course} onChange={handleSearchChange} />
      </Grid>
      <Grid item xs={2} sx={{ margin: '10px' }}>
        <TextField size='small' label='Nota' name='note' value={searchValues?.note} onChange={handleSearchChange} />
      </Grid>
    </Grid>
  )
}

export default SearchComponent
