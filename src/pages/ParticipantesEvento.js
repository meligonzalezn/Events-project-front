import Head from "next/head";
import axios from "axios";
import {
  Container,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";
import { ParticipantsListToolbar } from "src/components/activities-participants/participants-list-toolbar";
import { ParticipantsListResults } from "src/components/activities-participants/participants-list-results";
import LinearLoader from "src/components/loaders/LinealLoader";
import PerfectScrollbar from "react-perfect-scrollbar";

export default function ParticipantesEvento(props) {
  let paymentsData;
  let participantsData = [];
  let idUsers = []; //Array of users without duplicated values
  const [alreadyFetch, setAlreadyFetch] = useState(false);
  const [alreadyInfo, setAlreadyInfo] = useState(false);
  const [participantsInfo, setParticipantsInfo] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    /**
     * with this function we obtain information of participants in activity
     * @param {*} idEvent
     */

    async function eventParticipants(idEvent) {
      await axios.get("http://localhost:8000/Payment/").then((res) => {
        paymentsData = res.data
        paymentsData.map((element) => {
          if(element.ID_Event == idEvent) {
            //  is checked if the user already exists as a participant of the event
            // if not is added . This in case a participant is enrolled in many activities of the same event
            if (!idUsers.includes(element.ID_User)) {
              idUsers.push(element.ID_User);
            }
          }
        });

        if (idUsers.length == 0) {
          setIsEmpty(true);
        }
      });
      if (!isEmpty) {
        await axios.get("http://localhost:8000/User/").then((res) => {
          for (let item of idUsers) {
            participantsData.push(res.data.filter((element) => item == element.id));
            setAlreadyFetch(true);
          }
        });
        if (alreadyFetch) {
          setParticipantsInfo([...participantsData]);
          setAlreadyInfo(true);
        }
      }
    }
    eventParticipants(localStorage.getItem("idEvent"));
  }, [alreadyFetch]);

  return (
    <>
      {isEmpty == false ? (
        <>
          {alreadyFetch && alreadyInfo ? (
            <>
              <Head>
                <title>Participantes Evento</title>
              </Head>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  py: 8,
                }}
              >
                <Container maxWidth={false}>
                  <ParticipantsListToolbar />
                </Container>
                <Box sx={{ mt: 3 }}>
                  <ParticipantsListResults participants={participantsInfo} />
                </Box>
              </Box>
            </>
          ) : (
            <LinearLoader
              upperMessage="Cargando participantes"
              lowerMessage="Por favor espera"
            ></LinearLoader>
          )}
        </>
      ) : (
        <>
          <Head>
            <title>Participantes Evento</title>
          </Head>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth={false}>
              <ParticipantsListToolbar />
            </Container>
            <Box sx={{ mt: 3 }}>
              <Card {...props}>
                <PerfectScrollbar>
                  <Box sx={{ minWidth: 1050 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ paddingLeft: "34px" }}>Nombre</TableCell>
                          <TableCell>Apellido</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Teléfono</TableCell>
                          <TableCell>Estado de pago</TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </Box>
                </PerfectScrollbar>
              </Card>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

ParticipantesEvento.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
