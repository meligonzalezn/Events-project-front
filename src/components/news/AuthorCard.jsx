import { CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

/**
 * 
 * @param {{autor: object, editionTime: string}} props 
 * @returns 
 */
export default function AuthorCard(props) {
  return (
    <>
      <Box sx={{ pt: 10 }} />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', pb: 3 }}>
        </Box>

        <Typography align="center" color='#5048E5' gutterBottom variant="h5">
          {props.autor.Name}
        </Typography>
      </CardContent>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <div className="wrapperLeftRight">
            <AccessTimeFilledIcon className="leftItem" color="action" />

            <Typography className="rightItem" color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
              {props.editionTime}
            </Typography>
          </div>
        </Grid>
      </Box>
    </>
  )
}