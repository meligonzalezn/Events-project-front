import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import { useState, useEffect } from "react";
import LinearLoader from "../loaders/LinealLoader";
import ResponsiveDatePicker from "../date-picker/date-picker-responsive";
import axios from "axios";

const EVENTS_IN_DOUGHNUT = 5;

export const EventsInMonth = ({events}) => {
  const theme = useTheme();
  const [firstLoading, setFirstLoading] = useState(true);
  const [data, setData] = useState();
  const [options, setOptions] = useState();
  const [date, setDate] = useState(new Date());
  const eventsInMonth = [];
  const eventsInMonthIds = [];

  useEffect(() => {
    getEventsPerMonth(events);
    //setFirstLoading(false);
  }, [date]);

  /**
   * Obtains the number of events per month in the current year, sets the date and the options for the bar chart
   * Add validation that events are from current year
   * @param {*} data Events from db
   */
  const getEventsPerMonth = async (data) => {
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
    // get the payments 
    const res = await axios.get("http://localhost:8000/Payment/")
    const payments = res.data
    
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
            data: [63, 15, 22],
            backgroundColor: ["#3F51B5", "#e53935", "#FB8C00"],
            borderWidth: 8,
            borderColor: "#FFFFFF",
            hoverBorderColor: "#FFFFFF",
          },
        ],
        labels: ["Desktop", "Tablet", "Mobile"],
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
  };

  const devices = [
    {
      title: "Desktop",
      value: 63,
      icon: LaptopMacIcon,
      color: "#3F51B5",
    },
    {
      title: "Tablet",
      value: 15,
      icon: TabletIcon,
      color: "#E53935",
    },
    {
      title: "Mobile",
      value: 23,
      icon: PhoneIcon,
      color: "#FB8C00",
    },
  ];
//{{ height: '100%' }}
  return (
    <> 
    {firstLoading? 
    <LinearLoader upperMessage="Cargando reporte..."></LinearLoader>
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
    title="Traffic by Device" />
    <Divider />
    <CardContent>
      <Box
        sx={{
          height: 300,
          position: "relative",
        }}
      >
        <Doughnut data={data} options={options} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pt: 2,
        }}
      >
        {devices.map(({ color, icon: Icon, title, value }) => (
          <Box
            key={title}
            sx={{
              p: 1,
              textAlign: "center",
            }}
          >
            <Icon color="action" />
            <Typography color="textPrimary" variant="body1">
              {title}
            </Typography>
            <Typography style={{ color }} variant="h4">
              {value}%
            </Typography>
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
    }
    </>
  );
};
