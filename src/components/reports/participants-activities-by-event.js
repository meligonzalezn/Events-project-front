import { Doughnut } from "react-chartjs-2";
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import PhoneIcon from "@mui/icons-material/Phone";
import TabletIcon from "@mui/icons-material/Tablet";
import { useState, useEffect } from "react";
import LinearLoader from "../loaders/LinealLoader";
import ResponsiveDatePicker from "../date-picker/date-picker-responsive";
import axios from "axios";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { EventsDropdown } from "../events/events-dropdown";
import { eventData, getEventData } from "src/utils/eventAxios";
import { getActivitiesFromEvent, activitiesFromEvent } from "src/utils/activitiesAxios";


export const ActivitiesPerEvent = ({ events }) => {
  const theme = useTheme();
  const [firstLoading, setFirstLoading] = useState(true);
  const [data, setData] = useState();
  const [options, setOptions] = useState();
  const [eventName, setEventName] = useState("");
  const activities = [];

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
    //We get the id of the event selected
    await getEventData(eventName);
    console.log("eventData: ", eventData)
    const idEvent = eventData.id
    //Gets the activities from the event 
    await getActivitiesFromEvent(idEvent)
    console.log("actividades: ", activitiesFromEvent)

    setData({
      datasets: [
        {
          data: [1,2,3],
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
      labels: ["hola", "x", "y"],
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
  };

  const nullParticipants = () => {
    if (data === undefined) {
      return <> </>;
    }
    if (data.datasets[0].data.length === 0) {
      return (
        <>
          <DoNotDisturbAltIcon style={{ color: "#cc0000" }} />
          <Typography color="textPrimary" variant="body1">
            No hay eventos registrados para este mes!
          </Typography>
        </>
      );
    }
    if (data.datasets[0].data.length === 1) {
      if (data.datasets[0].data[0] === 0) {
        return (
          <>
            <DoNotDisturbAltIcon style={{ color: "#cc0000" }} />
            <Typography color="textPrimary" variant="body1">
              No hay participantes registrados en el evento!
            </Typography>
          </>
        );
      }
    } else {
      return <> </>;
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
            title="Participantes por evento"
          />
          <Divider />
          <CardContent>
            <LinearLoader upperMessage="Cargando reporte..."></LinearLoader>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader
            action={
              <EventsDropdown
                eventsNameState={eventName}
                setEventsNameState={setEventName}
              ></EventsDropdown>
            }
            title="Participantes por evento"
          />
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
              <>{nullParticipants()} </>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};
