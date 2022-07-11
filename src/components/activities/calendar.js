import axios from 'axios';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction' 
import { Modal} from '@mui/material';
import { ActivityRegisterForm } from './activity-register-form';
import { useStyles } from '../modals/modalAlert';
import styled from "@emotion/styled";

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
    font-size: 0.8vw;
    text-align: center;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media(max-width:1400px){
    .fc-event-title{
        font-size: 1vw;
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
    const styles = useStyles();
    var activitiesArray;
    var activitiesEvent = {}; 
    useEffect(() => {
        /**
         * With this function we get all activities we have register on DB
         * @returns 
         */
        const activitiesRequest = async () => {
            try {
                await axios.get("http://localhost:8000/Activity/").then((res) => {
                    activitiesEvent = res.data.filter((value) => value.ID_Event == localStorage.getItem('idEvent'))
                    activitiesArray = activitiesEvent.map((value) => {
                        return {
                            id: value.id,
                            title: value.Title, 
                            start: value.Date,
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

    const handleDateClick = (DateClickArg) => {
        SetDateSelectedState(DateClickArg.date.getDate() + '/'  + parseInt(DateClickArg.date.getMonth() + 1) + "/" + DateClickArg.date.getFullYear())
        setModalActivity(true)
    }
    const handleOnClose = () => {
        setModalActivity(!modalActivity)
    }
    return(
        <StyleWrapper> 
            <FullCalendar  
                events={dataCalendar}
                plugins={[dayGridPlugin, interactionPlugin]}
                dateClick={handleDateClick}
            />
            {modalActivity ?             
            <Modal open={modalActivity} onClose={handleOnClose} >
                <div className={styles.modal} style={{padding:0}}>
                    <ActivityRegisterForm dateselected={{dateSelectedState}}/>
                </div>
            </Modal> : null
            }
        </StyleWrapper>
    )
};
