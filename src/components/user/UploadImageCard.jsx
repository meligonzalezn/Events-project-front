import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { defaultUserIcon } from 'src/utils/defaultImages';

/**
 * Card que muestra la imagen subida por el usuario o una por
 * defecto en caso de no haber subido ninguna imagen. Se brinda
 * la opción de subir la imagen desde la card mediante un boton.
 * 
 * @param {{image: string, setImage: function, setImageChanged: function,
 *          imageChanged: boolean}} props 
 * @returns React component
 */
export default function UserUploadImageCard(props) {

  /**
   * Maneja lo relacionado a la subida de archivos.
   * @param {event} e 
   */
  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    props.setImage(image);
    props.setImageChanged(true);
  }

  return (
    <Card {...props}>
      <CardContent>
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <Avatar src={props.imageChanged ? URL.createObjectURL(props.image) : props.image} sx={{ height: 128, mb: 2, width: 128 }} />
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
            onChange={handleImageUpload}
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
  );
}
