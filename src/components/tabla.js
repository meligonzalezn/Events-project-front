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
import Link from 'next/link';
import { useRouter } from 'next/router';




/**
 * Make a table with next fields.
 * @param {{
 *  rows: []Object{
 *    Nombre: string,
 *    Role: string;
 *  },
 *  handleInhabilitar: function,
 *  onClick: function
 * }} props 
 * @returns 
 */
export default function BasicTable(props) {
  let rows = props.rows;
  return (
    <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
      {console.log(rows)}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align='right'>Rol</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            if (row.State !== props.StateExpected) return <></>
            return (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" style={{ cursor: 'pointer' }}>
                  <Link href={`/Usuarios/${row.id}/Editar`}>
                    {capitalizeWord(row.Name)}
                  </Link>
                </TableCell>
                <TableCell align='right' component="th" scope="row" style={{ cursor: 'pointer' }}>
                  <Link href={`/Usuarios/${row.id}/Editar`}>
                    {capitalizeWord(row.Role)}
                  </Link>
                </TableCell>
                <TableCell align='right'>
                  <DesplegableTabla id={row.id}></DesplegableTabla>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}