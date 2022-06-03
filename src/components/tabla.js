import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DesplegableTabla from './desplegableTabla';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeWord } from 'src/utils/string-processing';




/**
 * 
 * @param {{
 *  rows: []Object{
 *    name: string,
 *    rol: string;
 *  },
 *  handleInhabilitar: function,
 *  onClick: function
 * }} props 
 * @returns 
 */
export default function BasicTable(props) {
  const rows = props.rows;
  const onClick = () => {
    console.log("aaaa")
  }
  return (
    <TableContainer component={Paper} sx={{marginTop: "30px"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align='right'>Rol</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              onClick={onClick}
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {capitalizeWord(row.name)}
              </TableCell>
              <TableCell align='right' component="th" scope="row">
                {capitalizeWord(row.rol)}
              </TableCell>
              <TableCell align='right'>
                <DesplegableTabla handleInhabilitar={props.handleInhabilitar}></DesplegableTabla>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}