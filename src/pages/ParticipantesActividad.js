import Head from 'next/head';
import axios from 'axios';
import { Box, Container, TablePagination } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useEffect , useState} from 'react';
import { ParticipantsListToolbar } from 'src/components/activities-participants/participants-list-toolbar';
import { ParticipantsListResults } from 'src/components/activities-participants/participants-list-results';
import LinearLoader from 'src/components/loaders/LinealLoader';


export default function ParticipantesActividad(props) {
    let paymentsData = {};
    let participantsData = [];
    const [alreadyFetch, setAlreadyFetch] = useState(false)
    const [participantsInfo, setParticipantsInfo] = useState()
    useEffect(() => {
   /**
   * with this function we obtain information of participants in activity
   * @param {*} idActivity 
   * @param {*} idEvent 
   */

    async function activityParticipants(idActivity, idEvent) {
        await axios.get("http://localhost:8000/Payment/").then((res) => {
           paymentsData = res.data.filter((element) => (element.ID_Event == idEvent && element.ID_Activity == idActivity))
           
         })
         await axios.get("http://localhost:8000/User/").then((res) => {
           for (let item of paymentsData){
             participantsData.push(res.data.filter((element) => item.ID_User == element.id))
             setAlreadyFetch(true)
           }
          
         })
         if(alreadyFetch && participantsData.length !== 0){
                setParticipantsInfo([...participantsData])
         }
       }
       activityParticipants(localStorage.getItem('idActivity'), localStorage.getItem('idEvent'))
    },[alreadyFetch])

    
  return (
    <>
    {alreadyFetch && participantsInfo !== undefined ? 
    <>    
        <Head>
        <title>
            Participantes Actividad
        </title>
        </Head>
        <Box
        component="main"
        sx={{
            flexGrow: 1,
            py: 8
        }}
        >
        <Container maxWidth={false}>
            <ParticipantsListToolbar/>
        </Container>
            <Box sx={{ mt: 3 }}>
                <ParticipantsListResults participants={participantsInfo} /> 
            </Box>
        </Box>

    </>:             
    <LinearLoader
        upperMessage='Cargando participantes'
        lowerMessage='Por favor espera'
    ></LinearLoader>}

    </>
  )
}

ParticipantesActividad.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);