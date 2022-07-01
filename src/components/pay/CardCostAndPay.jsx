import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { defaultUserIcon } from 'src/utils/defaultImages';

export default function CardCostAndPay(props) {

  return (
    <Card {...props}>
      <CardContent>
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <Typography align='center' color="textSecondary" variant="body2" >
            Inserte aquí la imagen que desea ver de perfil
          </Typography>
        </Box>
      </CardContent>

      <Divider />

      <Box sx={{ p: 2, gap: '0.75rem' }} >
        <div className='wrapperCenter'>
          <input
            className='toCenter'
            style={{ display: 'none' }}
            id="media_file"
            type="file"
            accept='.png, .jpg, .jpeg'
            name="media_file"
            required
          >
          </input>
          <label htmlFor="media_file"
            className='toCenter'
            style={{
              color: '#5048E5', fontFamily: 'Inter', fontStyle: 'normal',
              fontWeight: '600', fontSize: '0.87rem', lineHeight: '1.5rem', cursor: 'pointer'
            }}>
            Subir archivo
          </label>
        </div>
      </Box>
    </Card>
  )
}