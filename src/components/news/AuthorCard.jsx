import { CardContent, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";


export default function AuthorCard(props) {
  return (
    <>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
        </Box>

        <Typography align="center" color='#5048E5' gutterBottom variant="h5">
          Nombre del Autor
        </Typography>
      </CardContent>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <div className="wrapperCenter">
            <Typography align="center" color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              Updated 2hr ago
            </Typography>
          </div>
        </Grid>
      </Box>
    </>
  )
}