import { newsTitle } from "src/utils/newsAxios";
import { Grid, TextField, MenuItem } from '@mui/material';

/**
 * Component that shows news registered in the database in a dropdown 
 * @param {*} param0 
 * @returns {React Component}
 */
export const NewsDropdown = ({newsNameState, setNewsNameState}) => {
    return (
        <Grid item md={12} xs={12} >
            <TextField
            fullWidth
            id="news_name"
            name="news_name"
            label="Seleccione una noticia *"
            select
            value={newsNameState}
            onChange={(event) => setNewsNameState(event.target.value)}
            variant="outlined"
            SelectProps={{
                MenuProps: {
                  sx: { maxHeight: '50%' }
                }
              }}
            >
            {newsTitle.map((option, key) => (
                <MenuItem value={option} key={key}>{option}</MenuItem>
            ))}
            </TextField>
        </Grid>
    )
}