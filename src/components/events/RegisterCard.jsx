import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

/**
 * Retorna una 'card' con un texto e un hipervínculo para
 * registrarse en un evento.
 * @param {{}} props 
 * @returns 
 */
export default function EventRegisterCard(props) {

  return (
    <>
      <Box sx={{ pt: 10 }} />

      <Typography align="center" color='#000000' gutterBottom variant="h6">
        ¿Deseas registrarte en este evento?
      </Typography>

      <Box sx={{ pt: 3 }} />

      {props.is_ready ?
        <Typography align="center" color='#5048E5' gutterBottom variant="h6">
          <Link href="Inscripcion">
            Registrarse {`>>>`}
          </Link>
        </Typography>
        : <></>
      }
    </>
  )
}