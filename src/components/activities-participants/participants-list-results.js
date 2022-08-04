import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';

export const ParticipantsListResults = ({ participants, ...rest }) => {
  const [selectedParticipantIds, setSelectedParticipantIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, participants.length - page * rowsPerPage);
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{paddingLeft:'34px'}}>                 
                  Nombre
                </TableCell>
                <TableCell>
                  Apellido  
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Teléfono
                </TableCell>
                <TableCell>
                  Estado de pago
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {participants.map((dataParticipant) => (
                dataParticipant.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((participant) => (
                    <TableRow
                    hover
                    key={participant.id}
                    selected={selectedParticipantIds.indexOf(participant.id) !== -1}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                          paddingLeft:'18px'
                        }}
                      >
                        <Avatar
                          src={"https://res.cloudinary.com/dxx9kwg6t/"+ participant.Media_file}
                          sx={{ mr: 2 }}
                        >
                          {getInitials(participant.Name)}
                        </Avatar>
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {participant.Name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {participant.Last_name}
                    </TableCell>
                    <TableCell>
                      {participant.Email}
                    </TableCell>
                    <TableCell>
                      {participant.Phone}
                    </TableCell>
                    <TableCell sx={{textAlign:'left', alignItems:'center', display:'flex', gap:'0.5rem' }}>
                        <CheckCircleOutlineIcon sx={{color:'green'}}/>
                        Completo
                    </TableCell>
                  </TableRow>
                ))
                
            ))}
            {emptyRows > 0 && (
           
           <TableRow style={{ height: 53 * emptyRows }}>
             <TableCell colSpan={6} />
           </TableRow>
         )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={participants.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[4, 10, 25]}
      />

    </Card>
  );
};

ParticipantsListResults.propTypes = {
  participants: PropTypes.array.isRequired
};
