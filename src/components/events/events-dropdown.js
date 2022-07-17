import { eventsTitle } from "src/utils/eventAxios";
import { Grid, TextField, MenuItem  } from '@mui/material';

/**
 * Component that shows news registered in the database in a dropdown 
 * @param {*} param0 
 * @returns {React Component}
 */
export const EventsDropdown = ({eventsNameState, setEventsNameState}) => {
    return (
        <Grid item md={12} xs={12} >
            <TextField
            fullWidth
            id="event_name"
            name="event_name"
            label="Seleccione un evento *"
            select
            value={eventsNameState}
            onChange={(event) => setEventsNameState(event.target.value)}
            variant="outlined"
            >
            {eventsTitle.map((option, key) => (
                <MenuItem value={option} key={key}>{option}</MenuItem>
            ))}
            </TextField>
        </Grid>
    )
}