import * as Yup from 'yup';
import { eventData, getEventData } from 'src/utils/eventAxios';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField, TextareaAutosize, MenuItem, Link } from '@mui/material';
import { useEffect, useState } from 'react';
import { ModalAlert } from '../modals/modalAlert';
import { EventsDropdown } from './events-dropdown';

/** 
 * @param {} props  
 * @returns React component.
 */
export const EventsUpdateForm = ({setSuccessfulRegister}) => {
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [eventName, setEventName] = useState('');

    /**
     * This function executes petition to get the data of the event that user wants to update
     * and set state to display form.
     */
     const executeFunction = async () => {
        try {
          await getEventData(eventName)
          setDisplayForm(true)
          //If display form state is true is because information was found successfully and loading has to stop
          if(displayForm === true){
            setLoadingSearch(false)
          }
        }
        catch(error){
          console.log(error)
        }
      }
    return(
        <Card>
                <CardHeader
                    subheader="Actualice el evento que desee aquí"
                    title="Evento"
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={3} > 
                      <EventsDropdown eventsNameState={eventName} setEventsNameState={setEventName}></EventsDropdown>
                        <Grid item md={12} xs={12} > 
                          <LoadingButton
                            loading={loadingSearch}
                            color="primary"
                            variant="contained"
                            disabled={eventName === ''}
                            onClick={() => executeFunction() && setLoadingSearch(!loadingSearch)}>
                            Buscar
                          </LoadingButton>
                        </Grid>
                    </Grid>
                </CardContent>
        </Card> 
    );
}