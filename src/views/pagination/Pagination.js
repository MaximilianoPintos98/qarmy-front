import { Grid, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({
  currentPage,
  pageSize,
  totalPages,
  totalCount,
  handlePageChange,
  handlePageSizeChange
}) => {
  return (
    <Grid container justifyContent="flex-end" alignItems="center" sx={{ marginTop: '10px' }}>
      <Typography sx={{ marginRight: '10px' }}>Page Size:</Typography>
      <select value={pageSize} onChange={handlePageSizeChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <Typography sx={{ marginRight: '10px', marginLeft: '10px' }}>
        Mostrando: {pageSize} de {totalCount}
      </Typography>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        showFirstButton
        showLastButton
        color="primary"
      />
    </Grid>
  );
};

export default PaginationComponent;