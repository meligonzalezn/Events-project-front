import axios from 'axios';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { CardHeader, Modal, Typography } from '@mui/material';
import { ActivityRegisterForm } from './activity-register-form';
import { ActivityInfoAndUpdate } from './activity-info-and-update';
import { useStyles } from '../modals/modalAlert';
import styled from "@emotion/styled";
import { Box } from '@mui/system';
import BackButton from '../BackButton';

export const StyleWrapper = styled.div`
  .fc .fc-button-primary {
    background-color: #5048E5;
  }
  .fc-daygrid-event {
    height: 50px;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .fc-event-title{
    color: black;
    font-size: 1vw;
    text-align: center;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media(max-width:1400px){
    .fc-event-title{
        font-size: 0.81vw;
    }
    @media(max-width:768px){
        .fc-event-title{
            font-size: 1.5vw;
        }
    
  }
  `
export const Calendar = () => {
  const [modalActivity, setModalActivity] = useState(false)
  const [dateSelectedState, SetDateSelectedState] = useState()
  const [dataCalendar, setDataCalendar] = useState()
  const [activityClick, setActivityClick] = useState(false)
  const [activityData, setActivityData] = useState()
  const [loading, setLoading] = useState(false);
  const styles = useStyles();
  var activitiesArray;
  var activitiesEvent = {};
  useEffect(() => {
    /**
     * With this function we get all activities we have register on DB 
     * @returns {array} we pass this array to Calendar component
     */
    const activitiesRequest = async () => {
      try {
        await axios.get("http://localhost:8000/Activity/").then((res) => {
          activitiesEvent = res.data.filter((value) => value.ID_Event == localStorage.getItem('idEvent') && value.State == 'Activo')
          activitiesArray = activitiesEvent.map((value) => {
            return {
              id: value.id,
              title: value.Title,
              details: value.Details,
              start: value.Date,
              initHour: value.Init_hour,
              finalHour: value.Final_hour,
              capacity: value.Capacity,
              cost: value.Cost,
              space: value.Space,
              state: value.State,
              color: "hsl(" + 360 * Math.random() + ',' +
                (25 + 70 * Math.random()) + '%,' +
                (85 + 10 * Math.random()) + '%)'
            }
          })
          setDataCalendar([...activitiesArray])
        })
      } catch (error) {
        console.log(error)
        return [null, error]
      }
    }
    activitiesRequest()
  }, [])
  /**
   * With this function we set date to pass to activity-register-form component and
   * to show modal to create an activity
   * @param {*} DateClickArg 
   */
  const handleDateClick = (DateClickArg) => {
    SetDateSelectedState(DateClickArg.date.getDate() + '/' + parseInt(DateClickArg.date.getMonth() + 1) + "/" + DateClickArg.date.getFullYear())
    setModalActivity(true)
  }
  /**
   * This function is to handle close of Modal to create an activity
   */
  const handleOnClose = () => {
    setModalActivity(!modalActivity)
  }
  /**
   * pending
   * @param {*} info 
   */
  const handleEventClick = (info) => {
    setActivityClick(true)
    setActivityData(info)
    setLoading(false);
  }

  const handleOnCloseInfo = () => {
    setActivityClick(!activityClick)
    setLoading(true);
  }

  return (
    <>
      <Box
        sx={{
          alignItems: 'center', display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', m: -1, pb: 2
        }}>
        <Typography sx={{ m: 1 }} variant="h4">
          Calendario
        </Typography>
        <BackButton route='/Eventos' />
      </Box>
      <StyleWrapper>
        <FullCalendar
          events={dataCalendar}
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={localStorage.getItem('userRole') == 'Cliente' ? null : handleDateClick}
          selectable="true"
          eventClick={handleEventClick}
        />
        {modalActivity ?
          <Modal open={modalActivity} onClose={handleOnClose} >
            <div className={styles.modal} style={{ padding: 0, alignItems: 'center' }}>
              <ActivityRegisterForm dateselected={{ dateSelectedState }} />
            </div>
          </Modal> : null}
        {activityClick && activityData && !loading ?
          <Modal open={activityClick} onClose={handleOnCloseInfo}>
            <div className={styles.modal} style={{ padding: 0, borderRadius: '0.6rem' }}>
              <ActivityInfoAndUpdate
                idactivity={activityData.event.id}
                titleactivity={activityData.event.title}
                dateactivity={activityData.event.start}
                inithouractivity={activityData.event.extendedProps.initHour}
                finalhouractivity={activityData.event.extendedProps.finalHour}
                capacityactivity={activityData.event.extendedProps.capacity}
                costactivity={activityData.event.extendedProps.cost}
                spaceactivity={activityData.event.extendedProps.space}
                stateactivity={activityData.event.extendedProps.state}
                detailsactivity={activityData.event.extendedProps.details}
                //0 is to indicate that is not a client 
                isclient={localStorage.getItem('userRole') == 'Cliente' ? null : 0}
              />
            </div>
          </Modal> : null}
      </StyleWrapper>
    </>
  )
};
