import { Card, CardContent, Container, Divider, Grid, Typography, Button, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import LinearLoader from "../loaders/LinealLoader";
import MapComponentView from "./ViewEventMap";
import { Clock as ClockIcon } from "../../icons/clock";
import { useRouter } from 'next/router';
import AttachMoney from "@mui/icons-material/AttachMoney";
import { enroll_user2event, is_enrolled2Event, uneroll_user2event } from "src/utils/eventAxios";
import BackButton from "../BackButton";

/**
 * Proporciona la vista completa de un evento, con su descripción
 * titulo,  imagen, fechas, costo e imagen adjunta.
 * @param {} props
 * @returns
 */
export default function ViewEvent(props) {
  const [loading, setLoading] = useState(true);
  const [theEvent, setTheEvent] = useState({});
  const router = useRouter();
  const [EnrollmentEnable, setEnrollmentEnable] = useState(true);
  const [ShowMessageError, setShowMessageError] = useState("");
  const [ShowSuccessEnrollment, setShowSuccessEnrollment] = useState("")
  const [IsEnrolled, setIsEnrolled] = useState(false)

  const image_url = (media_file) => {
    if (media_file === null) {
      return "https://res.cloudinary.com/dxx9kwg6t/" + media_file;
    }
    return media_file;
  };

  useEffect(() => {

    const evento = JSON.parse(localStorage.getItem("evento"));
    /**
     * Obtiene el evento del local storage.
     */
    const getEvent = async () => {
      setTheEvent(evento);
      setLoading(false);
    };

    const getIfUserIsEnrolled = () => {
      is_enrolled2Event(evento.id).then(([res, err]) => {
        console.log("err", err)
        if (err) return;

        setIsEnrolled(res);
      });
    }

    getEvent();
    getIfUserIsEnrolled();
  }, []);


  //Wait 5 seconds and should hide MessageError And SuccessEnrollmentMessage.
  useEffect(async () => {
    await new Promise(res => setTimeout(res, 5000));

    setShowMessageError("")
    setShowSuccessEnrollment("")

  }, [ShowMessageError, ShowSuccessEnrollment])

  const onUnerollUser2event = (e) => {
    if (!EnrollmentEnable) return;

    uneroll_user2event(theEvent.id).then(([res, err]) => {
      setEnrollmentEnable(true)
      if (err) {
        setShowMessageError("Error on UnEnrollment process")
        return
      }
      setShowSuccessEnrollment("UnEnrollment completed successfully")
      setIsEnrolled(false);

    })
    setEnrollmentEnable(false)
  }

  const onEnrollUser2Event = (e) => {
    if (!EnrollmentEnable) return;

    enroll_user2event(theEvent.id).then(([res, err]) => {
      setEnrollmentEnable(true)
      if (err) {
        setShowMessageError("Error on Enrollment process")
        return
      }
      setShowSuccessEnrollment("Enrollment completed successfully")
      setIsEnrolled(true);
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
          <Box sx={{ mt: 0.2, pb: 4 }}>
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

              {(localStorage.getItem('userRole') == 'Cliente') ? null :
               
                <Button color="primary" 
                variant="contained"
                onClick={(e) => router.push('/ParticipantesEvento') && localStorage.setItem('idEvent', theEvent.id)}>
                  Participantes
                </Button>
                
              }
              <BackButton route="/" />
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
                <Alert severity="success">{ShowSuccessEnrollment}</Alert>
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
        </CardContent >
      </Card >
    </>
  );
}
