import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import { useState, useEffect } from "react";
import LinearLoader from "../loaders/LinealLoader";
import ResponsiveDatePicker from "../date-picker/date-picker-responsive";
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

const EVENTS_IN_DOUGHNUT = 8;

export const EventsInMonth = ({events, payments}) => {
  const theme = useTheme();
  const [firstLoading, setFirstLoading] = useState(true);
  const [data, setData] = useState();
  const [options, setOptions] = useState();
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false)
  const eventsInMonth = [];
  const eventsInMonthIds = [];

  useEffect(() => {
    getParticipantsAmount(events);
    //setFirstLoading(false);
  }, [date]);

  /**
   * Obtains the 5 nearest events in a month selected and displays the amount of participants for each one. 
   * @param {*} data Events from db
   */
  const getParticipantsAmount =  (data) => {
    setLoading(true)
    //first we sort the events in order by more near to less near date 
    data.sort((a, b) => new Date(a.Start_date).getTime() > new Date(b.Start_date).getTime())
    let numberOfEvents = 0;
    console.log(data)
    //Later we add an X number of events from the month selected , these are saved in eventsInMonth 
    data.map((element)=>{
      const dateEvent =  element.Start_date
      const year = parseInt(dateEvent.substr(0,4))
      const month = parseInt(dateEvent.substr(6,2)) 
      console.log(year, date.getFullYear(), month, date.getMonth()+1)
      if(year === date.getFullYear() && month === date.getMonth()+1 && numberOfEvents<=EVENTS_IN_DOUGHNUT){
        eventsInMonth.push(element.Title)
        eventsInMonthIds.push(element.id)
        numberOfEvents = numberOfEvents + 1;
      }
    })
    // Get the number of participants for each event that is going to be display in the doughnut 
    console.log("Events in month:", date , eventsInMonth);
    
    let idUsers = {}; //Dictionary. Pair key,value where key an idEvent and Value an array with the users 
                      // enrolled to it (without duplicated values)
    let idEvents = []; // Array of events without duplicated values
    payments.map((element)=>{
      // If the events doesnt exists in the array is added
      if(!idEvents.includes(element.ID_Event)){
        idEvents.push(element.ID_Event)
        idUsers[element.ID_Event] = [element.ID_User]
    	}
      else{
        // if the event already exists then is checked if the user already exists as a participant of the event
        // if not is added
        if(!idUsers[element.ID_Event].includes(element.ID_User)){
          idUsers[element.ID_Event].push(element.ID_User)
        }
      }
    })
    console.log("eventsAndParticipants: ", idUsers, idEvents)

    let totalParticipantsPerEvent = []
    eventsInMonthIds.map((element)=>{
      console.log(element)
      if(idEvents.includes(element)){
        totalParticipantsPerEvent.push(idUsers[element].length)
      }
      else{
        totalParticipantsPerEvent.push(0)
      }
    })

    console.log("Total participants: ", eventsInMonth,totalParticipantsPerEvent)
  

 

    setData(
      {
        datasets: [
          {
            data: totalParticipantsPerEvent,
            backgroundColor: ["#3F51B5", "#e53935", "#FB8C00", "#00cc66", "#66ccff", "#ff1a66", "#a300cc", "#4d6600", "#ff9999","#cc99ff" ],
            borderWidth: 8,
            borderColor: "#FFFFFF",
            hoverBorderColor: "#FFFFFF",
          },
        ],
        labels: eventsInMonth,
      }
    )
    setOptions(
      {
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
      }

    )
    setFirstLoading(false);
    setLoading(false)
  };


  const nullParticipants = () => {
    if (data === undefined) {
      return(
        <LinearLoader upperMessage="Cargando reporte..."></LinearLoader>
      );
    }
    // Verifies if there are no events
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
            No hay eventos registrados para este mes!
          </Typography>
            </Box>
        </>
      );
    }
    //Verifies if there are no participants enrolled even if there are events
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
      
    } 
    else{
      return (
        <Box
        sx={{
          height: 300,
          position: "relative",
        }}
      > 
        <Doughnut data={data} options={options}/>
      </Box>
      );
    }
  };
//{{ height: '100%' }}
  return (
    <> 
    {firstLoading? 
    <Card>
    <CardHeader
      action={
        <ResponsiveDatePicker
        name="month"
        title="Seleccione una fecha"
        onChange={(e)=>{setDate(e)}}
        value={date}
        view ="year-month"
      />
      }
      title="Participantes por evento"
    />
    <Divider />
    <CardContent>
    <LinearLoader upperMessage="Cargando reporte..."></LinearLoader>
    </CardContent>
  </Card>
    
    :
    <> {loading? 
      <Card>
    <CardHeader
      action={
        <ResponsiveDatePicker
        name="month"
        title="Seleccione una fecha"
        onChange={(e)=>{setDate(e)}}
        value={date}
        view ="year-month"
      />
      }
      title="Participantes por evento"
    />
    <Divider />
    <CardContent>
    <LinearLoader upperMessage="Cargando reporte..."></LinearLoader>
    </CardContent>
  </Card>
      :
      <Card >
    <CardHeader
    action={(
      <ResponsiveDatePicker
              name="month"
              title="Seleccione una fecha"
              onChange={(e)=>{setDate(e)}}
              value={date}
              view ="year-month"
            />
    )}
    title="Participantes por evento" />
    <Divider />
    <CardContent>
        {nullParticipants()}
 
    </CardContent>
  </Card>
    }
    </>
    }
    </>
  );
};
