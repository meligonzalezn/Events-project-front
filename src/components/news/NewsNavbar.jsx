import { Box, Button, Card, CardContent, TextField, InputAdornment, SvgIcon, Typography } from '@mui/material';
import { Download as DownloadIcon } from '../../icons/download';
import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';

export const NewsNavbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Noticias
      </Typography>
    </Box>

    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
            <TextField sx={{ width: '30%' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search product"
              variant="outlined"
            />

            <Button color="primary" variant="contained">
              Agregar Noticias
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
