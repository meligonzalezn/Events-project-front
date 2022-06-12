import axios from 'axios'
import {Box,Button,Card,CardContent,TextField,InputAdornment,SvgIcon,Typography, Modal} from '@mui/material';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from '../../icons/search';  
import {NewsRegisterForm} from '../news/news-register-form'
import {useStyles} from "../modals/modalAlert"

export const NewsListToolbar = (props) => {
    const [buttonNews, setButtonNews] = useState(false);
    const styles = useStyles();     
    return(
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
            <Typography
            sx={{ m: 1 }}
            variant="h4"
            >
            Noticias
            </Typography>
            <Box sx={{ m: 1 }}>
            <Button
                color="primary"
                variant="contained"
                onClick={() => setButtonNews(!buttonNews)}
            >
                Añadir noticia
            </Button>
            </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
            <Card>
            <CardContent>
                <Box sx={{ maxWidth: 500 }}>
                <TextField
                    fullWidth
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
                    placeholder="Buscar noticia"
                    variant="outlined"
                />
                </Box>
            </CardContent>
            </Card>
        </Box>
        {(buttonNews == true) ? 
        <Modal open={buttonNews} onClose={() => setButtonNews(!buttonNews)}>
            <div className={styles.modal}>
                <NewsRegisterForm ></NewsRegisterForm>
            </div>
        </Modal>:<></>}
    </Box>
    )
  };
  