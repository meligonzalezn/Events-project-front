import axios from "axios";
import { Grid, TextField, MenuItem, CircularProgress } from '@mui/material';
import { useEffect, useState } from "react";

/**
 * Component that shows news registered in the database in a dropdown 
 * @param {*} param0 
 * @returns {React Component}
 */
export const NewsDropdown = ({ newsNameState, setNewsNameState }) => {
  const [newsData, setNewsData] = useState();
  /**
  * We get the news registered in database
  * @param {} 
  */
  useEffect(() => {

    const newsData = async () => {
      try {
        const newsRequest = await axios.get("https://abc-app-univalle.herokuapp.com/News/")
        setNewsData(newsRequest.data)
      }
      catch (error) {
        console.log(error)
        return [null, error]
      }
    }
    newsData()
  }, [])

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
        {newsData ? newsData.map((option, key) => (
          <MenuItem value={option.Title} key={key}>{option.Title}</MenuItem>
        )) : <MenuItem disabled value="default" key="default"><CircularProgress sx={{ margin: 'auto' }}></CircularProgress></MenuItem>}

      </TextField>
    </Grid>
  )
}