import React, { useState } from 'react';
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
  }`
export const Calendar = () => {
    const [modalActivity, setModalActivity] = useState(false)
    const [dateSelectedState, SetDateSelectedState] = useState()
    const styles = useStyles();
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
