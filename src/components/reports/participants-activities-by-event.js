import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import { useState, useEffect } from "react";
import LinearLoader from "../loaders/LinealLoader";
import ResponsiveDatePicker from "../date-picker/date-picker-responsive";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { EventsDropdown } from "../events/events-dropdown";
import { eventData, getEventData } from "src/utils/eventAxios";
import { getActivitiesFromEvent, activitiesFromEvent } from "src/utils/activitiesAxios";
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';


export const ActivitiesPerEvent = ({ events , payments}) => {
  const theme = useTheme();
  const [firstLoading, setFirstLoading] = useState(true);
  const [data, setData] = useState();
  const [options, setOptions] = useState();
  const [eventName, setEventName] = useState("");
  const activitiesTitle = [];
  const numberOfParticipants = [];
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (eventName !== "") {
      getParticipantsAmount(events);
    }
    //setFirstLoading(false);
  }, [eventName]);

  /**
   * Obtains the number of events per month in the current year, sets the date and the options for the bar chart
   * Add validation that events are from current year
   * @param {*} data Events from db
   */
  const getParticipantsAmount = async (data) => {
    setLoading(true)
    //We get the id of the event selected
    await getEventData(eventName);
    console.log("eventData: ", eventData)
    const idEvent = eventData.id
    //Gets the activities from the event 
    await getActivitiesFromEvent(idEvent)
    console.log("actividades: ", activitiesFromEvent)
    // gets the amount of participants per activity
    activitiesFromEvent.map((activity)=>{
        activitiesTitle.push(activity.Title)
        numberOfParticipants.push(payments.filter((element) => element.ID_Activity === activity.id).length)
    })
    console.log("participants:", numberOfParticipants)
   
    setData({
      datasets: [
        {
          data: numberOfParticipants,
          backgroundColor: [
            "#3F51B5",
            "#e53935",
            "#FB8C00",
            "#00cc66",
            "#66ccff",
            "#ff1a66",
            "#a300cc",
            "#4d6600",
            "#ff9999",
            "#cc99ff",
          ],
          borderWidth: 8,
          borderColor: "#FFFFFF",
          hoverBorderColor: "#FFFFFF",
        },
      ],
      labels: activitiesTitle,
    });
    setOptions({
      animation: false,
      cutoutPercentage: 80,
      layout: { padding: 0 },
      legend: {
        display: false,
      },
      maintainAspectRatio: false,
      responsive: true,
      tooltips: {
        backgroundColor: theme.palette.background.paper,
        bodyFontColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        enabled: true,
        footerFontColor: theme.palette.text.secondary,
        intersect: false,
        mode: "index",
        titleFontColor: theme.palette.text.primary,
      },
    });
    setFirstLoading(false);
    setLoading(false);
  };

  const nullParticipants = () => {
    if (data === undefined) {
      return(
        <> 
        <Box
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Typography color="textPrimary" variant="body1">
              Selecciona un evento
            </Typography>
            </Box>
        </>
        
      );
    }
    // Verifies if there are no activities
    if (data.datasets[0].data.length === 0) {
      return (
        <> 
        <Box
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <DoNotDisturbAltIcon style={{ color: "#cc0000" }} />
          <Typography color="textPrimary" variant="body1">
            No hay actividades registradas para este evento!
          </Typography>
            </Box>
        </>
      );
    }
    //Verifies if there are no participants enrolled even if there are activities 
    const dataVerification = new Set(data.datasets[0].data)
    if ([...dataVerification][0] === 0 && [...dataVerification].length === 1) {
        return (
          <> 
        <Box
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <DoNotDisturbAltIcon style={{ color: "#cc0000" }} />
          <Typography color="textPrimary" variant="body1">
            No hay participantes registrados!
          </Typography>
            </Box>
        </>
        );
      
    } else {
      return(
        <Box
              sx={{
                height: 300,
                position: "relative",
              }}
            >
              <Doughnut data={data} options={options} />
            </Box>
        
      );
    }
  };
  //{{ height: '100%' }}
  return (
    <>
      {firstLoading ? (
        <Card>
          <CardHeader
            action={
              <EventsDropdown
                eventsNameState={eventName}
                setEventsNameState={setEventName}
              ></EventsDropdown>
            }
            title="Participantes por actividad"
          />
          <Divider />
          <CardContent>
          <Box
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
            <DomainVerificationIcon style={{ color: "#3F51B5" }} />
            <Typography color="textPrimary" variant="body1">
              Selecciona un evento
            </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <> {loading? 
          <Card>
          <CardHeader
            action={
              <EventsDropdown
                eventsNameState={eventName}
                setEventsNameState={setEventName}
              ></EventsDropdown>
            }
            title="Participantes por actividad"
          />
          <Divider />
          <CardContent>
            <Box
              sx={{
                height: 300,
                position: "relative",
              }}
            >
              <LinearLoader upperMessage="Cargando reporte..."></LinearLoader>
            </Box>
          </CardContent>
        </Card>
        :
        <Card>
          <CardHeader
            action={
              <EventsDropdown
                eventsNameState={eventName}
                setEventsNameState={setEventName}
              ></EventsDropdown>
            }
            title="Participantes por actividad"
          />
          <Divider />
          <CardContent>
 
              {nullParticipants()}
           
          </CardContent>
        </Card>
        }</>
      )}
    </>
  );
  
};
