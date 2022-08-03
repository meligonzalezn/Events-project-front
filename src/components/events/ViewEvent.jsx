import { Card, CardContent, Container, Divider, Grid, Typography, Button, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import LinearLoader from "../loaders/LinealLoader";
import MapComponentView from "./ViewEventMap";
import { Clock as ClockIcon } from "../../icons/clock";
import axios from "axios";
import AttachMoney from "@mui/icons-material/AttachMoney";
import Link from "next/link";
import { enroll_user2event } from "src/utils/eventAxios";
import { XCircle } from "src/icons/x-circle";
import { Download } from "src/icons/download";
import { SeverityPill } from "../severity-pill";
import { TasksProgress } from "../dashboard/tasks-progress";

/**
 * Proporciona la vista completa de un evento, con su descripción
 * titulo,  imagen, fechas, costo e imagen adjunta.
 * @param {} props
 * @returns
 */
export default function ViewEvent(props) {
  const [loading, setLoading] = useState(true);
  const [theEvent, setTheEvent] = useState({});
  const [autor, setAutor] = useState({});
  const [EnrollmentEnable, setEnrollmentEnable] = useState(true);
  const [ShowMessageError, setShowMessageError] = useState("");
  const [ShowSuccessEnrollment, setShowSuccessEnrollment] = useState(false)

  const image_url = (media_file) => {
    if (media_file === null) {
      return "https://res.cloudinary.com/dxx9kwg6t/" + media_file;
    }
    return media_file;
  };

  useEffect(() => {
    /**
     * Obtiene el evento del local storage.
     */
    const getEvent = async () => {
      const evento = JSON.parse(localStorage.getItem("evento"));
      setTheEvent(evento);
      setLoading(false);
    };

    getEvent();
  }, []);

  //Wait 5 seconds and should hide MessageError And SuccessEnrollmentMessage.
  useEffect(async () => {
    await new Promise(res => setTimeout(res, 5000));

    setShowMessageError("")
    setShowSuccessEnrollment(false)

  }, [ShowMessageError, ShowSuccessEnrollment])

  const onEnrollUser2Event = (e) => {
    if(!EnrollmentEnable) return;
    enroll_user2event(theEvent.id).then(([res, err]) => {
      setEnrollmentEnable(true)
      if (err) {
        console.log(err)
        setShowMessageError("Error on Enrollment process")
        return
      }
      setShowSuccessEnrollment(true)

    })
    setEnrollmentEnable(false)
  }

  if (loading) {
    return (
      <LinearLoader
        upperMessage="Estamos cargando tu evento"
        lowerMessage="Por favor espera"
      ></LinearLoader>
    );
  }
  return (
    <>
      {/* <Card className="allHeight"> */}
      <Card>
        {" "}
        <CardContent>
          <Box sx={{ mt: 0.2, py: 1.5 }}>
            {/* <CardContent> */}
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Typography sx={{ m: 0.2 }} variant="h4">
                {theEvent.Title}
              </Typography>
            </Box>
            {/* </CardContent> */}
          </Box>

          <Divider></Divider>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 2,
            }}
          >
            <Container maxWidth="lg">
              {
                ShowMessageError ?
                  <Alert severity="error">{ShowMessageError}</Alert>
                  : null
              }
              {ShowSuccessEnrollment ?
                <Alert severity="success">Enrollment completed successfully</Alert>
                : null
              }
              <Grid container spacing={2}>
                <Grid item lg={4} md={6} xs={12}>
                  <MapComponentView place={theEvent.Space} />
                </Grid>

                <Grid item lg={8} md={6} xs={12}>
                  <Card>
                    <CardContent>
                      <div className="ownOverflow">
                        <Grid container spacing={0.5} sx={{ m: 1, gap: "1px", display: "flex" }}>
                          <Grid item xs={5} sx={{ alignItems: "center", display: "flex" }}>
                            <ClockIcon color="action" />

                            <Typography

                              display="inline"
                              sx={{ pl: 1 }}
                              variant="body2"
                            >
                              Inicio: <b></b>
                              {theEvent.Start_date}
                            </Typography>
                          </Grid>

                          <Grid item xs={6} sx={{ alignItems: "center", display: "flex" }}>
                            <ClockIcon color="action" />

                            <Typography

                              display="inline"
                              sx={{ pl: 1 }}
                              variant="body2"
                            >
                              Finalización: <b></b>
                              {theEvent.Finish_date}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} sx={{ alignItems: "center", display: "flex" }}>
                            <AttachMoney color="action" />

                            <Typography

                              display="inline"
                              sx={{ pl: 1 }}
                              variant="body2"
                            >
                              Precio: <b></b>
                              {theEvent.Cost}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Box sx={{ display: "flex", justifyContent: "center", px: 5, pt: 3 }}>
                          <img
                            style={{ height: "350px", width: "100%", objectFit: "cover" }}
                            alt="Event-image"
                            src={image_url(theEvent.Media_file)}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://res.cloudinary.com/dxx9kwg6t/image/upload/v1655159261/media/images_videos_news/il-news-and-press-default-card-img_kcsr9g.jpg";
                            }}
                            variant="square"
                          />
                        </Box>

                        <Typography
                          align="left"
                          color="textPrimary"
                          variant="body1"
                          sx={{ marginBottom: "8.4px", pt: 3, px: 1 }}
                        >
                          {theEvent.Details}
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>
          <Box sx={{ m: 1, gap: "8px", display: "flex" }}>
            <Button variant="outlined">Participantes</Button>
            <Button color="primary" variant="contained">
              Actividades
            </Button>
            <Button onClick={onEnrollUser2Event}>Enroll</Button>
          </Box>

          {/* <div className="wrapper">
          <div />

          <div><MapComponentView place={theEvent.Space}/></div>

          <div className="wrapperCenter">
            <Divider className="toCenter" orientation="vertical" sx={{ height: "90%" }} />
          </div>

          <div className="ownOverflow">
            <Typography
              align="left"
              color="textPrimary"
              variant="body1"
              sx={{ marginBottom: "8.4px", pt: 3, px: 1 }}
            >
              {theEvent.Details}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", px: 5, pt: 3 }}>
              <img 
                style={{ height: "350px", width: "100%", objectFit: "cover" }}
                alt="Event-image"
                src={image_url(theEvent.Media_file)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://res.cloudinary.com/dxx9kwg6t/image/upload/v1655159261/media/images_videos_news/il-news-and-press-default-card-img_kcsr9g.jpg";
                }}
                variant="square"
              />
            </Box>

             <Typography align="left" color="textPrimary" variant="body1" sx={{ marginBottom: '8.4px', pt: 4, px: 1 }}>
              {theNew.Description}
            </Typography> 
          </div>

          <div />
        </div> */}
          {/* </Card> */}
        </CardContent>
      </Card>
    </>
  );
}
